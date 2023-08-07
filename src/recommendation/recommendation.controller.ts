import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { UniversalArgs } from 'src/find-options/dto/find-args.input';
import { RecommendationInput } from './dto/recommendation.input';
import { Recommendation } from './recommendation.entity';
import { RecommendationService } from './recommendation.service';

@Controller('recommendation')
export class RecommendationController {
    constructor (
        private readonly recommendationService: RecommendationService
    ) {}
    // @Get()
    // async read(@Body() args: UniversalArgs): Promise<Recommendation[]> {
    //     return await this.recommendationService.findAll(args);
    // }

    // @Get('/:user')
    // async readByUser(@Param() params): Promise<Recommendation[]> {
    //     // return await this.recommendationService.findAll({ search: [ { key: "user", value: params.user } ] });
    //     return await this.recommendationService.findAll({ where: { in: [{key: 'user', value: [params.user]}] } });
    // }

    // @Get('/:user/:reviewer')
    // async checkReviewerRecommended(@Param() params): Promise<Recommendation[]> {
    //     return await this.recommendationService.findAll({ where: { in: [{key: 'user', value: [params.user]}], search:[{key: "recommendations", value: params.reviewer}] } });
    // }
    
    // @Post()
    // async create(@Body() recommendations: RecommendationInput[]): Promise<Recommendation[]> {
    //     return await this.recommendationService.create(recommendations);
    // }
    
    // @Patch()
    // async update(@Body() recommendations: RecommendationInput[]): Promise<Recommendation[]> {
    //     return await this.recommendationService.update(recommendations);
    // }
    
    // @Delete()
    // async remove(@Body() ids: number[]): Promise<void> {
    //     return await this.recommendationService.remove(ids);
    //     // return this.room.getHello();
    // }
}
