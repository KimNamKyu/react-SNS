import { Injectable } from '@nestjs/common';

// 요청, 응답에 대해서는 모른다. 순수 처리 비즈니스 로직 
// 결과값만 Controller로 리턴
@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
}
