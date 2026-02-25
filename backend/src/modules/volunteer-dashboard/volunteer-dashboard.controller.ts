import { Controller } from '@nestjs/common';
import { CategoriesService } from '../categories/categories.service';
import { PostsService } from '../posts/posts.service';
import { Get, Query } from '@nestjs/common';

@Controller('volunteer-dashboard')
export class VolunteerDashboardController {
  constructor(
    private readonly categoriesService: CategoriesService,
    private readonly postsService: PostsService,
  ) {}

  @Get('categories')
  async getCategories() {
    return this.categoriesService.findAll();
  }

  @Get('posts')
  async getPosts(@Query('categoryId') categoryId?: string) {
    const id = categoryId ? parseInt(categoryId, 10) : undefined;
    return this.postsService.findAll(id);
  }
}
