import { Module } from '@nestjs/common';
import { VolunteerDashboardController } from './volunteer-dashboard.controller';
import { VolunteerDashboardService } from './volunteer-dashboard.service';
import { CategoriesModule } from '../categories/categories.module'; // Імпортуємо модуль категорій
import { PostsModule } from '../posts/posts.module';

@Module({
  imports: [CategoriesModule, PostsModule],
  controllers: [VolunteerDashboardController],
  providers: [VolunteerDashboardService],
})
export class VolunteerDashboardModule {}
