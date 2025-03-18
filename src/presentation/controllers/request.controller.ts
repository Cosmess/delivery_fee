import { Controller, Get } from '@nestjs/common';
import { RequestService } from '../../application/services/request.service';

@Controller('requests')
export class RequestController {
  constructor(private readonly requestService: RequestService) {}

  @Get('last')
  async getLastRequests() {
    return this.requestService.getLastRequests();
  }
}
