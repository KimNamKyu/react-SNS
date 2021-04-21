import { createParamDecorator, ExecutionContext } from '@nestjs/common';

//User 데코레이터 커스텀 
export const User = createParamDecorator(
    (data: unknown, ctx: ExecutionContext) => {
        const request = ctx.switchToHttp().getNext();
        return request.user;
    }
)