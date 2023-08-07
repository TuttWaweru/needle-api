import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { MediaitemModule } from './mediaitem/mediaitem.module';
import { MediaModule } from './media/media.module';
import { FindOptionsModule } from './find-options/find-options.module';
import { ProductModule } from './product/product.module';
import { RoomModule } from './room/room.module';
import { RecommendationModule } from './recommendation/recommendation.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { environmentVariables, typeOrmModuleConfiguration } from './app.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [environmentVariables],
    }),
    TypeOrmModule.forRootAsync(typeOrmModuleConfiguration),
    MediaModule,
    MediaitemModule,
    UserModule,
    ProductModule,
    RoomModule,
    RecommendationModule,
    FindOptionsModule
  ],
})
export class AppModule {
  constructor(private configService: ConfigService) {}
}
