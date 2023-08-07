import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Media } from './media.entity';
import { Repository, FindManyOptions, FindOneOptions } from 'typeorm';
import { FindOptionsService } from '../find-options/find-options.service';
import { MediaInput } from './dto/media.input';
import { UniversalArgs } from 'src/find-options/dto/find-args.input';

@Injectable()
export class MediaService {
    constructor(
        @InjectRepository(Media)
        private mediaRepo: Repository<Media>,
        private findOptionsGenerator: FindOptionsService
      ) {}
    
    // async onApplicationBootstrap() {
    //   console.log("onAppBootstrap: called");
    //   await this.client.connect();
    // } 
    async create(payload: MediaInput[]): Promise<Media[]> {
        return await this.mediaRepo.save(payload);
    }

    findAll(args: UniversalArgs): Promise<Media[]> {
        let options: FindManyOptions = this.findOptionsGenerator.generate(args)
        return this.mediaRepo.find(options);
    }
    
    findOne(args: UniversalArgs): Promise<Media> {
        let options: FindOneOptions = this.findOptionsGenerator.generate1(args)
        return this.mediaRepo.findOne(options);
    }

    async remove(ids: number[]): Promise<void> {
        await this.mediaRepo.delete(ids);
    }

    async update(payload: MediaInput[]): Promise<Media[]> {
        return await this.mediaRepo.save(payload);
    }
}
