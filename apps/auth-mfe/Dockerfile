FROM node:18-alpine AS deps
WORKDIR /repo
RUN npm install -g pnpm

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY packages/ ./packages/
COPY apps/auth-mfe/package.json ./apps/auth-mfe/

RUN pnpm install --frozen-lockfile --filter "./apps/auth-mfe..."

FROM deps AS dev-auth
WORKDIR /repo/apps/auth-mfe

COPY apps/auth-mfe/ .

EXPOSE 3002

CMD ["pnpm", "dev"]