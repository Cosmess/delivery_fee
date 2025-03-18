import { ApiProperty } from '@nestjs/swagger';

export class AddressDTO {
  @ApiProperty({ example: { lat: 19.3331008, lng: -81.3801101 } })
  coordinates: {
    lat: number;
    lng: number;
  };
}

export class DeliveryFeeRequestDTO {
  @ApiProperty({ type: AddressDTO })
  addressFrom: AddressDTO;

  @ApiProperty({ type: AddressDTO })
  addressTo: AddressDTO;
}

export class DeliveryFeeResponseDTO {
  @ApiProperty({ example: 8.13 })
  originalFee: number;

  @ApiProperty({ example: 9.19 })
  newFee: number;

  @ApiProperty({ example: 0 })
  deliveryTime: number;

  @ApiProperty({ example: 6651.61 })
  distanceMeters: number;

  @ApiProperty({ example: null, nullable: true })
  message: string | null;
}
