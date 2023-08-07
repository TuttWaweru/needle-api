import { Module, Global } from '@nestjs/common';
import { FindOptionsService } from './find-options.service';

@Global()
@Module({
  exports: [FindOptionsService],
  providers: [FindOptionsService]
})
export class FindOptionsModule {}
