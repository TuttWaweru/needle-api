import { Injectable } from '@nestjs/common';
import { MediaItem } from './mediaitem.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindManyOptions, FindOneOptions } from 'typeorm';
import { FindOptionsService } from 'src/find-options/find-options.service';
import { MediaItemInput } from './dto/mediaitem.input';
import { UniversalArgs } from 'src/find-options/dto/find-args.input';

@Injectable()
export class MediaitemService {
    constructor(
        @InjectRepository(MediaItem)
        private mediaitemRepo: Repository<MediaItem>,
        private findOptionsGenerator: FindOptionsService
      ) {}
    
    // async onApplicationBootstrap() {
    //   console.log("onAppBootstrap: called");
    //   await this.client.connect();
    // } 
    async create(payload: MediaItemInput[]): Promise<MediaItem[]> {
        return await this.mediaitemRepo.save(payload);
    }

    async findAll(args: UniversalArgs): Promise<MediaItem[]> {
        let options: FindManyOptions = this.findOptionsGenerator.generate(args)
        return await this.mediaitemRepo.find(options);
    }
    
    findOne(args: UniversalArgs): Promise<MediaItem> {
        let options: FindOneOptions = this.findOptionsGenerator.generate1(args)
        return this.mediaitemRepo.findOne(options);
    }

    async remove(ids: number[]): Promise<void> {
        await this.mediaitemRepo.delete(ids);
    }

    async update(payload: MediaItemInput[]): Promise<MediaItem[]> {
        return await this.mediaitemRepo.save(payload);
    }
}
