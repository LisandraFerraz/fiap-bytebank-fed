FROM node:18-alpine AS deps
WORKDIR /repo
RUN npm install -g pnpm

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY packages/ ./packages/
COPY apps/next-bytebank/package.json ./apps/next-bytebank/

RUN pnpm install --frozen-lockfile --filter "./apps/next-bytebank..."

FROM deps AS dev-host
WORKDIR /repo/apps/next-bytebank
COPY apps/next-bytebank/ .

EXPOSE 3001
CMD ["pnpm", "dev"]