import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { Module } from '@nestjs/common';

@Module({
  controllers: [PostsController],
  providers: [PostsService],
  exports: [PostsService],
})
export class PostsModule {}
