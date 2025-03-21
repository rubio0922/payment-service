import { FastifyInstance } from 'fastify';
import { trace, context } from '@opentelemetry/api';

export async function registerFastifyOtelPlugin(fastify: FastifyInstance) {
  fastify.addHook('onRequest', async (request, reply) => {
    const span = trace.getTracer('fastify-tracer').startSpan(`HTTP ${request.method} ${request.url}`);
    request.headers['x-trace-id'] = span.spanContext().traceId;
    context.with(trace.setSpan(context.active(), span), () => {
      reply.header('x-trace-id', span.spanContext().traceId);
    });
  });

  fastify.addHook('onResponse', async (request, reply) => {
    const span = trace.getSpan(context.active());
    if (span) {
      span.end();
    }
  });
}
