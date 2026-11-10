import { FastifyInstance, FastifyPluginAsync, FastifyRequest, FastifyReply } from "fastify";
import { authenticate } from "../../middleware/auth.guard.js";
import { authService } from "./auth.service.js";
import {
  Me,
  officerLoginSchema,
  bootstrapRequestSchema,
  studentLoginSchema,
  studentRegisterSchema,
} from "./auth.dto.js";

export const authRoutes: FastifyPluginAsync = async (fastify: FastifyInstance) => {
  /**
   * B/H.1.0: POST /me/bootstrap
   * Create student profile after verified session
   */
  fastify.post("/me/bootstrap", async (request, reply) => {
    const authHeader = request.headers.authorization;
    if (!authHeader || !authHeader.toLowerCase().startsWith("bearer ")) {
      return reply.status(401).send({
        error: {
          code: "UNAUTHORIZED",
          message: "Token autentikasi tidak ditemukan atau format tidak valid",
          request_id: request.id,
        },
      });
    }

    const token = authHeader.slice(7).trim();
    const payload = authService.verifyToken(token);
    if (!payload || !payload.sub) {
      return reply.status(401).send({
        error: {
          code: "UNAUTHORIZED",
          message: "Token autentikasi tidak valid atau sudah kedaluwarsa",
          request_id: request.id,
        },
      });
    }

    const parseResult = bootstrapRequestSchema.safeParse(request.body);
    if (!parseResult.success) {
      return reply.status(400).send({
        error: {
          code: "VALIDATION_ERROR",
          message: parseResult.error.issues[0]?.message || "Input tidak valid",
          request_id: request.id,
          details: parseResult.error.issues,
        },
      });
    }

    const email = payload.email || `${payload.sub}@student.budiluhur.ac.id`;
    const result = await authService.bootstrapStudent(
      payload.sub,
      email,
      parseResult.data.full_name,
      parseResult.data.student_number
    );

    if (!result.success) {
      return reply.status(result.statusCode || 400).send({
        error: {
          code: result.code,
          message: result.message,
          request_id: request.id,
        },
      });
    }

    return reply.status(201).send({
      data: result.data,
    });
  });
  /**
   * B/D.2.0: GET /me
   * Get current verified profile for authenticated user.
   * Returns 401 UNAUTHORIZED if not logged in.
   * Returns 404 PROFILE_NOT_FOUND when session is valid but user is not in database.
   * No profile is created implicitly.
   */
  fastify.get("/me", { preHandler: [authenticate] }, async (request, reply) => {
    const user = request.currentUser!;

    let assignedPostId: number | null = null;
    if (user.role === "OFFICER") {
      const post = await authService.getOfficerPost(user.userId);
      assignedPostId = post?.postId ?? null;
    }

    const meData: Me = {
      user_id: user.userId,
      full_name: user.fullName,
      email: user.email,
      student_number: user.studentNumber,
      role: user.role,
      assigned_post_id: assignedPostId,
      nim_verification_status: "NOT_VERIFIED",
    };

    return reply.status(200).send({
      data: meData,
    });
  });

  /**
   * B/D.2.1: POST /auth/officer-login
   * Server-Side Officer Authentication & Bcrypt Verification
   * Zero-Trust: Backend is the sole validator of credentials and role.
   */
  const handleOfficerLogin = async (request: FastifyRequest, reply: FastifyReply) => {
    const parseResult = officerLoginSchema.safeParse(request.body);
    if (!parseResult.success) {
      return reply.status(400).send({
        error: {
          code: "VALIDATION_ERROR",
          message: parseResult.error.issues[0]?.message || "Input tidak valid",
          request_id: request.id,
        },
      });
    }

    const { email, password } = parseResult.data;
    const loginResult = await authService.officerLogin(email, password);

    if (!loginResult.success) {
      return reply.status(401).send({
        error: {
          code: loginResult.code,
          message: loginResult.message,
          request_id: request.id,
        },
      });
    }

    return reply.status(200).send({
      data: loginResult.data,
    });
  };

  fastify.post("/auth/officer-login", handleOfficerLogin);
  fastify.post("/officer/login", handleOfficerLogin);

  /**
   * B/H.1.3: POST /auth/student-login
   * Server-Side Student Authentication & Bcrypt Verification
   */
  const handleStudentLogin = async (request: FastifyRequest, reply: FastifyReply) => {
    const parseResult = studentLoginSchema.safeParse(request.body);
    if (!parseResult.success) {
      return reply.status(400).send({
        error: {
          code: "VALIDATION_ERROR",
          message: parseResult.error.issues[0]?.message || "Input tidak valid",
          request_id: request.id,
        },
      });
    }

    const { email, password } = parseResult.data;
    const loginResult = await authService.studentLogin(email, password);

    if (!loginResult.success) {
      return reply.status(loginResult.statusCode || 401).send({
        error: {
          code: loginResult.code,
          message: loginResult.message,
          request_id: request.id,
        },
      });
    }

    return reply.status(200).send({
      data: loginResult.data,
    });
  };

  /**
   * B/H.1.4: POST /auth/student-register
   * Server-Side Student Registration
   */
  const handleStudentRegister = async (request: FastifyRequest, reply: FastifyReply) => {
    const parseResult = studentRegisterSchema.safeParse(request.body);
    if (!parseResult.success) {
      return reply.status(400).send({
        error: {
          code: "VALIDATION_ERROR",
          message: parseResult.error.issues[0]?.message || "Input tidak valid",
          request_id: request.id,
        },
      });
    }

    const { full_name, email, password, student_number } = parseResult.data;
    const registerResult = await authService.studentRegister(
      full_name,
      email,
      password,
      student_number
    );

    if (!registerResult.success) {
      return reply.status(registerResult.statusCode || 400).send({
        error: {
          code: registerResult.code,
          message: registerResult.message,
          request_id: request.id,
        },
      });
    }

    return reply.status(201).send({
      data: registerResult.data,
    });
  };

  fastify.post("/auth/student-login", handleStudentLogin);
  fastify.post("/student/login", handleStudentLogin);
  fastify.post("/auth/student-register", handleStudentRegister);
  fastify.post("/student/register", handleStudentRegister);
};
