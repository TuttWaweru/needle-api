import { Module } from '@nestjs/common';
import { MediaService } from './media.service';
import { MediaController } from './media.controller';
import { Media } from './media.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forFeature([Media]),
  ],
  exports: [TypeOrmModule, MediaService],
  providers: [MediaService],
  controllers: [MediaController]
})
export class MediaModule {}
