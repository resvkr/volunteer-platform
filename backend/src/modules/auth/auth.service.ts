import {
  Injectable,
  UnauthorizedException,
  Inject,
  ConflictException,
  forwardRef,
} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { RegisterDto } from './dto/register.dto';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { DRIZZLE } from '../../database/database.module';
import * as schema from '../../database/schema';
import { eq } from 'drizzle-orm';
import * as bcrypt from 'bcrypt';

export const ROLE_NAMES = {
  1: 'ADMIN',
  2: 'USER',
  3: 'VOLUNTEER',
} as const;

type RoleId = keyof typeof ROLE_NAMES;

interface UserEntity {
  id: number;
  email: string;
  role: number;
}

@Injectable()
export class AuthService {
  constructor(
    @Inject(forwardRef(() => UsersService))
    private userService: UsersService,
    private jwtService: JwtService,
    @Inject(DRIZZLE)
    private db: NodePgDatabase<typeof schema>,
  ) {}

  async generateToken(user: UserEntity): Promise<string> {
    const roleId = user.role as RoleId;
    const roleName = ROLE_NAMES[roleId] || 'USER';

    const payload = {
      username: user.email,
      sub: user.id,
      role: roleName,
    };
    return await this.jwtService.signAsync(payload);
  }

  async signIn(email: string, pass: string): Promise<{ access_token: string }> {
    const user = await this.userService.findOne(email);

    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    const isMatch = await bcrypt.compare(pass, user.password);
    if (!isMatch) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const roleId = user.role as RoleId;
    const roleName = ROLE_NAMES[roleId];

    const payload = {
      username: user.email,
      sub: user.id,
      role: roleName,
    };
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

      const defaultPhoto =
        'https://pub-cc401c48b031446b873c68956d2d8ae8.r2.dev/avatar.png';

      const [newUser] = await tx
        .insert(schema.users)
        .values({
          email: dto.email,
          password: hashedPassword,
          firstName: dto.firstName,
          lastName: dto.lastName,
          city: dto.city,
          photoUrl: defaultPhoto,
          role: dto.isVolunteer ? 3 : 2,
        })
        .returning();

      await tx.insert(schema.userProfiles).values({
        userId: newUser.id,
        dream: dto.isVolunteer ? dto.dream : null,
        averageRating: '0.00',
        reviewCount: 0,
      });

      const roleId = dto.isVolunteer ? 3 : 2;

      const payload = {
        username: newUser.email,
        role: roleId,
        sub: newUser.id,
      };
      return {
        access_token: await this.jwtService.signAsync(payload),
      };
    });
  }
}
