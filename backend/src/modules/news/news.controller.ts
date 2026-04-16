import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Req,
  UseGuards,
  Query,
} from '@nestjs/common';
import { NewsService } from './news.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('news')
export class NewsController {
  constructor(private readonly newsService: NewsService) {}

  @UseGuards(JwtAuthGuard)
  @Get('dashboard')
  async getAll(
    @Req() req: { user: { id: number } },
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
  ) {
    return this.newsService.getFeed(req.user.id, Number(page), Number(limit));
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(
    @Body()
    createDto: {
      author_id: number;
      caption: string;
      location: string;
      photos: string[];
    },
  ) {
    return this.newsService.createPost(createDto);
  }

  @UseGuards(JwtAuthGuard)
  @Post(':id/like')
  async toggleLike(
    @Param('id') id: string,
    @Req() req: { user: { id: number } },
  ) {
    const userId = req.user.id;
    return this.newsService.toggleLike(Number(id), userId);
  }
}
