import { defineController } from "./$relay";
import { FastifyRequest } from "fastify";
import firebaseAdmin from "$/service/firebaseAdmin";

export type AdditionalRequest = Pick<FastifyRequest, "cookies">;

export default defineController(() => ({
  get: async ({ cookies }) => {
    console.log("cookies:", cookies);
    const auth = firebaseAdmin.auth();
    const sessionId = cookies.session || "";
    const decodedClaims = await auth
      .verifySessionCookie(sessionId)
      .catch(() => null);
    if (!decodedClaims) return { status: 401 };
    return { status: 200, body: decodedClaims.uid };
  },
}));
