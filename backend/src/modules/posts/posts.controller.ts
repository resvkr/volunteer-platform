import {
  Controller,
  Get,
  Post,
  Query,
  UseGuards,
  Body,
  Param,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @UseGuards(JwtAuthGuard)
  @Get('category')
  async getPosts(@Query('categoryId') categoryId?: string) {
    const id = categoryId ? Number(categoryId) : undefined;
    return await this.postsService.findAll(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post('create')
  async createPost(
    @Body()
    data: {
      author_id: number;
      title: string;
      description: string;
      category_name: string;
      location: string;
      contact: string;
      additional_info: string;
      image_url?: string;
      event_time: string;
      event_date: string;
    },
  ) {
    return await this.postsService.create(data);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':authorId')
  async getPostsByAuthor(@Param('authorId') authorId: string) {
    const id = Number(authorId);
    return await this.postsService.findByAuthorId(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post(':postId/mark-as-done')
  async markAsDone(@Param('postId') postId: string) {
    const id = Number(postId);
    return await this.postsService.markAsDone(id);
  }

  @UseGuards(JwtAuthGuard)
  @Get('details/:postId')
  async getPostDetails(@Param('postId') postId: string) {
    const id = Number(postId);
    return await this.postsService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post(':postId/mark-as-in_progress')
  async markAsInProgress(@Param('postId') postId: string) {
    const id = Number(postId);
    return await this.postsService.markAsInProgress(id);
  }
}
