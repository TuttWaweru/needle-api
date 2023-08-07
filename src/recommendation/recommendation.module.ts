import { Module } from '@nestjs/common';
import { RecommendationService } from './recommendation.service';
import { RecommendationController } from './recommendation.controller';
import { Recommendation } from './recommendation.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forFeature([Recommendation]),
  ],
  exports: [TypeOrmModule, RecommendationService],
  providers: [RecommendationService],
  controllers: [RecommendationController]
})
export class RecommendationModule {}
