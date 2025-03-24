import { NestMiddleware } from "@nestjs/common";
import { NextFunction } from "express";
import { FastifyRequest } from "fastify";
import { ServerResponse } from "http";

interface RequestWithId extends Request {
    id: string;
}
export declare class RequestIdMiddleware implements NestMiddleware {
    use(req: RequestWithId | FastifyRequest, res: ServerResponse, next: NextFunction): void;
}
export {};