import { Injectable, Logger, NestMiddleware } from "@nestjs/common";
import { Request, Response, NextFunction } from "express";

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
    //implements => 반드시 구현
    private logger = new Logger('HTTP'); 

    use(request: Request, response: Response, next: NextFunction): void {
        const { ip, method, originalUrl } = request;
        const userAgent = request.get('user-agent') || ''; // 헤더에서 가져오기

        //on ? 라우터 보다 먼저 실행
        response.on('finish', () => {
            const { statusCode } = response;
            const contentLength = response.get('content-length');
            this.logger.log(    //console log 보다 Logger.log를 많이 사용
                `${method} ${originalUrl} ${statusCode} ${contentLength} - ${userAgent} ${ip}`,
            );
        }); //http요청들 로그 찍기
        next();
    }
}