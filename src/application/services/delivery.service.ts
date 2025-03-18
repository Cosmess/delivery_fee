import { Injectable, NotFoundException } from '@nestjs/common';
import { BentoAuthService } from '../../infrastructure/external/bento-auth.service';
import { BentoApiService } from '../../infrastructure/external/bento-api.service';
import { RequestService } from './request.service';

@Injectable()
export class DeliveryService {
  constructor(
    private readonly bentoAuthService: BentoAuthService,
    private readonly bentoApiService: BentoApiService,
    private readonly requestService: RequestService
  ) {}

  async getAdjustedFee(addressFrom: any, addressTo: any, userAgent: string) {
    // Step 1: Get the Firebase ID token
    const token = await this.bentoAuthService.getUserToken();

    // Step 2: Fetch the user UUID
    const uuid = await this.bentoAuthService.getUserUUID(token);

    // Step 3: Retrieve the delivery fee
    const response = await this.bentoApiService.getDeliveryFee(token, uuid, addressFrom, addressTo);
    if(!response){
        throw new NotFoundException('Data Not Found');      
    }
    const originalFee = response.fee / 100;
    const deliveryTime = response.deliveryTime;
    const distanceMeters = parseFloat((response.distanceMeters).toFixed(2));;
    const message = response.message;
    // Step 4: Apply a 13% margin
    const newFee = parseFloat((originalFee * 1.13).toFixed(2)); // ✅ Always rounds to 2 decimal places

    // Step 5: Log the request in Firestore
    await this.requestService.logRequest({
      originalFee,
      newFee,
      timestamp: new Date().toISOString(),
      userAgent,
      userUUID: uuid,
      message,
      deliveryTime,
      distanceMeters
    });

    return { originalFee, newFee,deliveryTime,distanceMeters};
  }
}
