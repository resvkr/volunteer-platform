import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { VolunteersModule } from './modules/volunteers/volunteers.module';
import { NewsModule } from './modules/news/news.module';
import { R2Module } from './modules/r2/r2.module';
import { CategoriesModule } from './modules/categories/categories.module';
import { PostsModule } from './modules/posts/posts.module';

@Module({
  imports: [
    UsersModule,
    DatabaseModule,
    ConfigModule.forRoot({ isGlobal: true }),
    AuthModule,
    CategoriesModule,
    PostsModule,
    VolunteersModule,
    NewsModule,
    R2Module,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
