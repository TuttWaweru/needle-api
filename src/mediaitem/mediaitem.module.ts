import { Module } from '@nestjs/common';
import { MediaitemService } from './mediaitem.service';
import { MediaitemController } from './mediaitem.controller';
import { MediaItem } from './mediaitem.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MulterModule } from '@nestjs/platform-express';
import { MediaModule } from 'src/media/media.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([MediaItem]),
    MediaModule,
    MulterModule.register({
      dest: './templates',
    })
  ],
  exports: [TypeOrmModule, MediaitemService],
  providers: [MediaitemService],
  controllers: [MediaitemController]
})
export class MediaitemModule {}
