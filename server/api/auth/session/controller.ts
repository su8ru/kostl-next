import { FastifyReply, FastifyRequest } from "fastify";
import firebaseAdmin from "$/service/firebaseAdmin";
import { defineController, defineHooks } from "./$relay";

export type AdditionalRequest = Pick<FastifyRequest, "cookies"> & {
  setCookie: (...args: Parameters<FastifyReply["setCookie"]>) => void;
};

export const hooks = defineHooks(() => ({
  preHandler: (req, reply, done) => {
    Object.assign(req, {
      setCookie: (...args: Parameters<FastifyReply["setCookie"]>) =>
        void reply.setCookie(...args),
    });
    done();
  },
}));

export default defineController(() => ({
  post: async ({ body: { token }, setCookie }) => {
    const auth = firebaseAdmin.auth();
    const expiresIn = 60 * 60 * 24 * 5 * 1000;
    const sessionCookie = await auth.createSessionCookie(token, { expiresIn });
    setCookie("session", sessionCookie, {
      maxAge: expiresIn,
      httpOnly: true,
      secure: process.env.NODE_ENV !== "development",
      path: "/",
    });
    return { status: 200 };
  },
  delete: async ({ setCookie, cookies }) => {
    const auth = firebaseAdmin.auth();
    const sessionId = cookies.session || "";
    const decodedClaims = await auth
      .verifySessionCookie(sessionId)
      .catch(() => null);
    if (decodedClaims) await auth.revokeRefreshTokens(decodedClaims.sub);
    setCookie("session", "", { maxAge: 0, path: "/" });
    return { status: 200 };
  },
}));
