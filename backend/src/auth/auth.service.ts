import {
  Injectable,
  UnauthorizedException,
  Inject,
  ConflictException,
} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { RegisterDto } from './dto/register.dto';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { DRIZZLE } from '../database/database.module';
import * as schema from '../database/schema';
import { eq } from 'drizzle-orm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
    @Inject(DRIZZLE) private db: NodePgDatabase<typeof schema>,
  ) {}

  async signIn(email: string, pass: string): Promise<{ access_token: string }> {
    const user = await this.userService.findOne(email);

    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    const isMatch = await bcrypt.compare(pass, user.password);
    if (!isMatch) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = { username: user.email, sub: user.id };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async register(dto: RegisterDto): Promise<{ access_token: string }> {
    return await this.db.transaction(async (tx) => {
      const existingUser = await tx
        .select()
        .from(schema.users)
        .where(eq(schema.users.email, dto.email));

      if (existingUser.length > 0) {
        throw new ConflictException('User with this email already exists');
      }

      const hashedPassword = await bcrypt.hash(dto.password, 10);

      const [newUser] = await tx
        .insert(schema.users)
        .values({
          email: dto.email,
          password: hashedPassword,
          firstName: dto.firstName,
          lastName: dto.lastName,
          city: dto.city,
          role: dto.isVolunteer ? 3 : 2,
        })
        .returning();

      if (dto.photoUrl) {
        await tx.insert(schema.userPhotos).values({
          userId: newUser.id,
          photoUrl: dto.photoUrl,
          isMain: true,
        });
      }

      if (dto.isVolunteer) {
        await tx.insert(schema.volunteerProfiles).values({
          userId: newUser.id,
          dream: dto.dream,
        });
      }

      const payload = { username: newUser.email, sub: newUser.id };
      return {
        access_token: await this.jwtService.signAsync(payload),
      };
    });
  }
}
