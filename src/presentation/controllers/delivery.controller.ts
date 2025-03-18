import { Controller, Get, Query, Headers, BadRequestException, Req } from '@nestjs/common';
import { DeliveryService } from '../../application/services/delivery.service';
import { ApiTags, ApiQuery, ApiResponse } from '@nestjs/swagger';
import { DeliveryFeeResponseDTO } from '../../application/dtos/delivery-fee.dto';

@ApiTags('Delivery')
@Controller('delivery')
export class DeliveryController {
  constructor(private readonly deliveryService: DeliveryService) {}

  @Get('fee')
  @ApiQuery({ name: 'addressFrom', description: 'JSON string of addressFrom', example: '{"coordinates": {"lat": 19.3331008, "lng": -81.3801101}}' })
  @ApiQuery({ name: 'addressTo', description: 'JSON string of addressTo', example: '{"coordinates": {"lat": 19.2803544, "lng": -81.3738686}}' })
  @ApiResponse({ status: 200, description: 'Delivery fee calculated', type: DeliveryFeeResponseDTO })
  async getFee(
    @Req() request: any,
    @Query('addressFrom') addressFromString?: string,
    @Query('addressTo') addressToString?: string
  ) {
    if (!addressFromString || !addressToString) {
      throw new BadRequestException('addressFrom and addressTo are required');
    }

    let addressFrom, addressTo;
    try {
      addressFrom = JSON.parse(addressFromString);
      addressTo = JSON.parse(addressToString);
    } catch (error) {
      throw new BadRequestException('Invalid JSON format for addressFrom or addressTo');
    }

    const userAgent = request.headers['user-agent'] || 'Unknown';

    return this.deliveryService.getAdjustedFee(addressFrom, addressTo, userAgent);
  }
}
