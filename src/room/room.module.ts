import { Module } from '@nestjs/common';
import { RoomService } from './room.service';
import { RoomController } from './room.controller';
import { Room } from './room.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoomGateway } from './room.gateway';

@Module({
  imports: [
    TypeOrmModule.forFeature([Room]),
  ],
  exports: [TypeOrmModule, RoomService],
  providers: [RoomService, RoomGateway],
  controllers: [RoomController]
})
export class RoomModule {}
