import { Controller, Get, Query } from '@nestjs/common';
import { PostsService } from './posts.service';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get()
  async getPosts(@Query('categoryId') categoryId?: string) {
    const id = categoryId ? Number(categoryId) : undefined;
    return await this.postsService.findAll(id);
  }
}
