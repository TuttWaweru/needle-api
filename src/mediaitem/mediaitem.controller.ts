import { Body, Controller, Delete, Get, Param, Patch, Post, Req, UploadedFile, UploadedFiles, UseGuards, UseInterceptors } from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { MediaItemInput } from './dto/mediaitem.input';
import { MediaItem } from './mediaitem.entity';
import { MediaitemService } from './mediaitem.service';
import { FileUpload } from './multer.options';
// import { RestJwtAuthGuard } from 'src/auth/guards/rest-jwt-auth.guard';
import { MediaService } from 'src/media/media.service';

@Controller('api/mediaitem')
export class MediaitemController {
    constructor (
        private readonly mediaItemService: MediaitemService,
        private readonly mediaService: MediaService,
    ) {}
    // @UseGuards(RestJwtAuthGuard)
    @Get()
    async read(): Promise<MediaItem[]> {
        return await this.mediaItemService.findAll({});
    }

    // @UseGuards(RestJwtAuthGuard)
    @Get('/:by')
    async readByUser(@Param() params): Promise<MediaItem[]> {
        return await this.mediaItemService.findAll({ where: { in: [{key: 'by', value: [params.by]}] } });
    }
    
    // @UseGuards(RestJwtAuthGuard)
    @Post()
    async create(@Body() templates: MediaItemInput[]): Promise<MediaItem[]> {
        return await this.mediaItemService.create(templates);
    }
    
    // @UseGuards(RestJwtAuthGuard)
    // @Post('/upload/:type')
    // @UseInterceptors(FileInterceptor('file', FileUpload.UploadOptions()))
    // async uploadByType(@UploadedFile() file, @Param() params, @Req() request) {
    //     console.log(`Uploading file by: ${request?.user?.username ? request.user.username : request.user.email}`)
    //     let media = await this.mediaService.findOne({ where: { and: [{ key: "type", value: params.type }] } })
    //     return await this.mediaItemService.create([{ media, name: file.filename, path: `${file.destination}/${file.filename}`, size: file.size, extension: file.mimetype, encoding: file.encoding, by: request?.user }])
    // }
    
    // @UseGuards(RestJwtAuthGuard)
    // @Post('/multi-upload/:type')
    // @UseInterceptors(FilesInterceptor('files', 10, FileUpload.UploadOptions()))
    // async uploadMultipleByType(@UploadedFiles() files, @Param() params, @Req() request) {
    //     console.log(`Uploading files by: ${request?.user?.username}`)
    //     let media = await this.mediaService.findOne({ where: { and: [{ key: "type", value: params.type }] } })
    //     return await this.mediaItemService.create(files.reduce((result, file) => [...result, { media, name: file.filename, path: `${file.destination}/${file.filename}`, size: file.size, extension: file.mimetype, encoding: file.encoding, by: request?.user } ], []))
    // }
    
    // @UseGuards(RestJwtAuthGuard)
    @Patch()
    async update(@Body() templates: MediaItemInput[]): Promise<MediaItem[]> {
        return await this.mediaItemService.update(templates);
    }
    
    // @UseGuards(RestJwtAuthGuard)
    @Delete()
    async remove(@Body() ids: number[]): Promise<void> {
        return await this.mediaItemService.remove(ids);
        // return this.room.getHello();
    }
}
