import { Controller, Get } from '@nestjs/common';
import { VolunteersService } from './volunteers.service';

@Controller('volunteers')
export class VolunteersController {
  constructor(private readonly volunteersService: VolunteersService) {}

  @Get()
  async getVolunteers() {
    return this.volunteersService.findAllVolunteers();
  }
}
