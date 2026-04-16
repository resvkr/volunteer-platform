import { Module } from '@nestjs/common';
import { R2Controller } from './r2.controller';
import { R2Service } from './r2.service';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  imports: [MulterModule.register({})],
  controllers: [R2Controller],
  providers: [R2Service],
  exports: [R2Service],
})
export class R2Module {}
