export class Request {
    constructor(
      public originalFee: number,
      public newFee: number,
      public timestamp: Date,
      public userAgent: string
    ) {}
  }
  