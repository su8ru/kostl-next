# こすとれ - KO･S Train Location

## Workspace

- `apps/web`: Next.js frontend for Cloudflare Pages
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

### Deploy API Worker

```
pnpm deploy:api
```

The API Worker is configured for `api.kostl.info` in
`apps/api/wrangler.jsonc`. Set the ODPT token before deploying:

```
pnpm --filter @kostl/api exec wrangler secret put API_ODPT_TOKEN
```

Cloudflare Pages should keep deploying the frontend from `apps/web` for
`kostl.info`. Set `NEXT_PUBLIC_API_BASE_URL=https://api.kostl.info` when the
Pages project does not inherit it from the build environment.
