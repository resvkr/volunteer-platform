import {
  IsEmail,
  IsBoolean,
  IsString,
  MinLength,
  IsOptional,
} from 'class-validator';

export class RegisterDto {
  @IsEmail({}, { message: 'Invalid email format' })
  email!: string;

  @IsString()
  @MinLength(8, { message: 'Password must be at least 8 characters long' })
  password!: string;

  @IsString()
  firstName!: string;

  @IsString()
  lastName!: string;

  @IsString()
  city!: string;

  @IsBoolean()
  isVolunteer!: boolean;

  @IsOptional()
  @IsString()
  dream?: string;
}
