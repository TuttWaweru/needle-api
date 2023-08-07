import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
// import { RestJwtAuthGuard } from 'src/auth/guards/rest-jwt-auth.guard';
import { MediaInput } from './dto/media.input';
import { Media } from './media.entity';
import { MediaService } from './media.service';

@Controller('api/media')
export class MediaController {
    constructor (
        private readonly mediaService: MediaService
    ) {}
    
    // @UseGuards(RestJwtAuthGuard)
    @Get()
    async read(): Promise<Media[]> {
        return await this.mediaService.findAll({});
    }

    // @UseGuards(RestJwtAuthGuard)
    @Get('/:user')
    async readByUser(@Param() params): Promise<Media[]> {
        return await this.mediaService.findAll({ where: { in: [{key: 'user', value: [params.user]}] } });
    }
    
    // @UseGuards(RestJwtAuthGuard)
    @Post()
    async create(@Body() templates: MediaInput[]): Promise<Media[]> {
        return await this.mediaService.create(templates);
    }
    
    // @UseGuards(RestJwtAuthGuard)
    @Post('/:user')
    async createSubdomain(@Param() params) {
        // return await this.mediaService.createSubDomain(params.user);
    }
    
    // @UseGuards(RestJwtAuthGuard)
    @Patch()
    async update(@Body() templates: MediaInput[]): Promise<Media[]> {
        return await this.mediaService.update(templates);
    }
    
    // @UseGuards(RestJwtAuthGuard)
    @Delete()
    async remove(@Body() ids: number[]): Promise<void> {
        console.log(ids)
        return await this.mediaService.remove(ids);
        // return this.room.getHello();
    }
}
