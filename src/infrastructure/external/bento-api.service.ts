import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class BentoApiService {
    private readonly baseUrl = process.env.BENTO_API_BASE_URL;
    private readonly merchantId = process.env.BENTO_MERCHANT_ID;

    async getDeliveryFee(token: string, uuid: string, addressFrom: any, addressTo: any): Promise<any> {
        try {
            const response = await axios.post(
                `${this.baseUrl}/api/v1/delivery/fee`,
                {
                    addressFrom,
                    addressTo,
                    merchant: { id: this.merchantId },
                    user: { uuid },
                },
                { headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' } }
            );

            return response.data;
        } catch (error) {
            console.error('BentoApiService.getDeliveryFee : error and send data to api', error.message);
            return null;
        }
    }
}
