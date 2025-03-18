import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DeliveryController } from './presentation/controllers/delivery.controller';
import { RequestController } from './presentation/controllers/request.controller';
import { DeliveryService } from './application/services/delivery.service';
import { RequestService } from './application/services/request.service';
import { BentoAuthService } from './infrastructure/external/bento-auth.service';
import { BentoApiService } from './infrastructure/external/bento-api.service';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
  ],
  controllers: [DeliveryController, RequestController],
  providers: [DeliveryService, RequestService, BentoAuthService, BentoApiService],
})
export class AppModule {}
