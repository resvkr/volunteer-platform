import { Controller, Get, UseGuards } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('categories')
export class CategoriesController {
  constructor(private categoriesService: CategoriesService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async getAll() {
    return await this.categoriesService.findAll();
  }
}
