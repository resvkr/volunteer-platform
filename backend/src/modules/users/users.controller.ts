import {
  Body,
  Controller,
  UseGuards,
  Get,
  Post,
  Param,
  Req,
  ParseIntPipe,
  Patch,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

interface RequestWithUser extends Request {
  user: {
    id: number;
    username: string;
    role: string;
  };
}

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(JwtAuthGuard)
  @Get('profile/:id')
  async getProfile(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.findProfileById(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post('review')
  async postReview(
    @Req() req: RequestWithUser,
    @Body() body: { toUserId: number; rating: number; comment?: string },
  ) {
    return this.usersService.addReview(req.user.id, body);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('update')
  async updateProfile(
    @Req() req: RequestWithUser,
    @Body()
    body: {
      firstName?: string;
      lastName?: string;
      city?: string;
      photoUrl?: string;
      bio?: string;
      dream?: string;
    },
  ) {
    return this.usersService.updateProfile(req.user.id, body);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('become-volunteer')
  async becomeVolunteer(
    @Req() req: RequestWithUser,
    @Body() body: { dream: string },
  ) {
    return this.usersService.becomeVolunteer(req.user.id, body.dream);
  }
}
