import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RecommendationInput } from './dto/recommendation.input';
import { Recommendation } from './recommendation.entity';
import { BaseService } from 'src/base.service';

@Injectable()
export class RecommendationService extends BaseService<RecommendationInput, Recommendation>{
    constructor(
        @InjectRepository(Recommendation)
        readonly repo: Repository<Recommendation>,
    ){ super(repo) }

}
