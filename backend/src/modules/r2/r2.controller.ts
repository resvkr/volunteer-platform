import {
  Controller,
  Post,
  Get,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { R2Service } from './r2.service';

interface IUploadedFile {
  buffer: Buffer;
  mimetype: string;
  originalname: string;
}

@Controller('storage')
export class R2Controller {
  constructor(private readonly r2Service: R2Service) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async upload(@UploadedFile() file: IUploadedFile) {
    const fileName = `${Date.now()}-${file.originalname}`;
    const url = await this.r2Service.uploadFile(file, fileName);
    return { url };
  }

  @Get('files')
  async getFiles() {
    return await this.r2Service.listFiles();
  }
}
