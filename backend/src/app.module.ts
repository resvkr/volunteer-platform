import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { VolunteerDashboardModule } from './modules/volunteer-dashboard/volunteer-service.module';
import { VolunteersModule } from './modules/volunteers/volunteers.module';

@Module({
  imports: [
    UsersModule,
    DatabaseModule,
    ConfigModule.forRoot({ isGlobal: true }),
    AuthModule,
    VolunteerDashboardModule,
    VolunteersModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
