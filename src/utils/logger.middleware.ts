import { Injectable, NestMiddleware, Logger } from '@nestjs/common';
import { FastifyRequest, FastifyReply } from 'fastify';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private readonly logger = new Logger('HTTP');

  use(req: FastifyRequest, res: FastifyReply, next: () => void): void {
    const { method, url } = req;
    const start = Date.now();

    res.raw.on('finish', () => {
      const { statusCode } = res;
      const duration = (Date.now() - start).toFixed(2);
      this.logger.log(`${method} ${url} ${statusCode} - ${duration}ms`);
    });

    next();
  }
}