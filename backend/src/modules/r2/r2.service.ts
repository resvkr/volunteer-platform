import { Injectable, Logger } from '@nestjs/common';
import {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
  ListObjectsV2Command,
} from '@aws-sdk/client-s3';
import { ConfigService } from '@nestjs/config';

interface UploadedFile {
  buffer: Buffer;
  mimetype: string;
  originalname: string;
}

@Injectable()
export class R2Service {
  private readonly s3Client: S3Client;
  private readonly bucketName: string;
  private readonly logger = new Logger(R2Service.name);

  constructor(private configService: ConfigService) {
    this.bucketName = this.configService.getOrThrow<string>('R2_BUCKET_NAME');

    this.s3Client = new S3Client({
      region: 'auto',
      endpoint: `https://${this.configService.getOrThrow('R2_ACCOUNT_ID')}.r2.cloudflarestorage.com`,
      credentials: {
        accessKeyId: this.configService.getOrThrow('R2_ACCESS_KEY_ID'),
        secretAccessKey: this.configService.getOrThrow('R2_SECRET_ACCESS_KEY'),
      },
    });
  }

  async uploadFile(file: UploadedFile, key: string) {
    const command = new PutObjectCommand({
      Bucket: this.bucketName,
      Key: key,
      Body: file.buffer,
      ContentType: file.mimetype,
    });

    await this.s3Client.send(command);

    const publicDomain = this.configService.get<string>('R2_PUBLIC_DOMAIN');

    return `https://${publicDomain}/${key}`;
  }

  async getFileContent(key: string): Promise<string> {
    const command = new GetObjectCommand({
      Bucket: this.bucketName,
      Key: key,
    });

    const response = await this.s3Client.send(command);
    return response.Body?.transformToString() ?? '';
  }

  async listFiles() {
    const command = new ListObjectsV2Command({
      Bucket: this.bucketName,
    });

    const list = await this.s3Client.send(command);
    return list.Contents?.map((obj) => obj.Key) || [];
  }
}
