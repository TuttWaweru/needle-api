import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { UniversalArgs } from 'src/find-options/dto/find-args.input';
import { RoomInput } from './dto/room.input';
import { Room } from './room.entity';
import { RoomService } from './room.service';

@Controller('room')
export class RoomController {
    constructor(
        private readonly roomService: RoomService
    ){}
    
    // @Get('/user/:user')
    // async findByUser(@Param() params): Promise<Room[]> {
    //     // return await this.roomService.findAll({ where: { and: [ { key: "users", value: JSON.stringify(params.users.split(' ')) } ] } });
    //     return await this.roomService.findAll({ search: [ { key: "users", value: params.user } ] });
    // }
    
    // @Get('/users/:users')
    // async findByUsers(@Param() params): Promise<Room[]> {
    //     return await this.roomService.findAll({ where: { and: [ { key: "users", value: JSON.stringify(params.users.split(' ')) } ] } });
    // }
    
    // @Get('/name/:name')
    // async findByName(@Param() params): Promise<Room[]> {
    //     return await this.roomService.findAll({ where: { and: [ { key: "name", value: params.name } ] } });
    // }
    // @Get()
    // async read(@Body() args: UniversalArgs): Promise<Room[]> {
    //     return await this.roomService.findAll(args);
    // }
    
    @Post()
    async create(@Body() rooms: RoomInput[]): Promise<Room[]> {
        return await this.roomService.create(rooms);
    }
    
    // @Patch()
    // async update(@Body() rooms: RoomInput[]): Promise<Room[]> {
    //     return await this.roomService.update(rooms);
    // }
    
    // @Delete()
    // async remove(@Body() ids: number[]): Promise<void> {
    //     return await this.roomService.remove(ids);
    //     // return this.room.getHello();
    // }
}
