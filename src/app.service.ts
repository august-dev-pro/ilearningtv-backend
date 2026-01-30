import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'iLearningTV API is running 🚀';
  }
}
