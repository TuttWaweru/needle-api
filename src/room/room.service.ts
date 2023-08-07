import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RoomInput } from './dto/room.input';
import { Room } from './room.entity';
import { BaseService } from 'src/base.service';

@Injectable()
export class RoomService extends BaseService<RoomInput, Room> {
    constructor(
        @InjectRepository(Room)
        readonly repo: Repository<Room>,
    ){ super(repo) }

}
