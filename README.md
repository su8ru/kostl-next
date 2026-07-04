# こすとれ - KO･S Train Location

## Workspace

- `apps/web`: Next.js frontend for Cloudflare Workers Assets
- `apps/api`: Hono API for Cloudflare Workers
- `packages/shared`: Shared static data and types

## Scripts

### Project Setup

```
pnpm install
```

### Start Development Server

```
pnpm dev
```

This starts both apps:

- `apps/api`: `http://localhost:8787`
- `apps/web`: `http://localhost:8000`

For local API secrets, copy `apps/api/.dev.vars.example` to
`apps/api/.dev.vars` and set `API_ODPT_TOKEN`.

### Typecheck and Lint

```
pnpm typecheck
pnpm lint
```

### Build for Production

```
pnpm build
```

### Deploy Workers

```
pnpm deploy:dry-run
pnpm deploy
```

This deploys the API Worker first, then the Web Worker.

### Deploy API Worker

```
pnpm deploy:api:dry-run
pnpm deploy:api
```

The API Worker is configured for `api.kostl.info` in
`apps/api/wrangler.jsonc`. Set the ODPT token before deploying:

```
pnpm --filter @kostl/api exec wrangler secret put API_ODPT_TOKEN
```

### Deploy Web Worker

```
pnpm deploy:web:dry-run
pnpm deploy:web
```

The Web Worker is configured for `kostl.info` in `apps/web/wrangler.jsonc`.
It serves the static Next.js export from `apps/web/out` with Workers Assets.
Set these build-time environment variables when deploying outside GitHub
Actions:

```
NEXT_PUBLIC_API_BASE_URL=https://api.kostl.info
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
NEXT_PUBLIC_GIT_COMMIT_SHA=$(git rev-parse HEAD)
```
