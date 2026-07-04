export const NEXT_PUBLIC_GA_ID = process.env.NEXT_PUBLIC_GA_ID ?? null;
export const NEXT_PUBLIC_GIT_COMMIT_SHA =
  process.env.NEXT_PUBLIC_CF_PAGES_COMMIT_SHA ??
  process.env.NEXT_PUBLIC_GIT_COMMIT_SHA ??
  null;
