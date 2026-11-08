import { FastifyRequest, FastifyReply } from "fastify";
import { authenticate } from "./authenticate.guard.js";

/**
 * B/H.1.1: Fastify preHandler to enforce STUDENT role
 */
export async function requireStudent(
  request: FastifyRequest,
  reply: FastifyReply
): Promise<void> {
  if (!request.currentUser) {
    await authenticate(request, reply);
    if (reply.sent) {
      return;
    }
  }

  const user = request.currentUser!;

  if (user.role !== "STUDENT") {
    return reply.status(403).send({
      error: {
        code: "FORBIDDEN",
        message: "Akses ditolak: Hanya mahasiswa (STUDENT) yang berhak mengakses layanan ini",
        request_id: request.id,
      },
    });
  }
}
