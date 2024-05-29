import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import { ParseJsonPipe } from 'src/pipes/parse-json.pipe';


@Injectable()
export class ParseJsonInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const req = context.switchToHttp().getRequest();
    const parseJsonPipe = new ParseJsonPipe(req.body.constructor);
    req.body = parseJsonPipe.transform(req.body, { type: 'body', data: '' });
    return next.handle();
  }
}