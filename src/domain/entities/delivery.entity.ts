export class Delivery {
    constructor(
      public originalFee: number,
      public newFee: number,
      public deliveryTime: number,
      public distanceMeters: number
    ) {}
  }
  