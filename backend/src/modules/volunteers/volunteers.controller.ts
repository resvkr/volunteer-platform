import { Controller, Get, UseGuards } from '@nestjs/common';
import { VolunteersService } from './volunteers.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('volunteers')
export class VolunteersController {
  constructor(private readonly volunteersService: VolunteersService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async getVolunteers() {
    return this.volunteersService.findAllVolunteers();
  }
}
