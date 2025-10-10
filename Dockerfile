# ---------- base (shared) ----------
FROM node:20-bookworm-slim AS base
ARG NPM_TOKEN
ENV NPM_TOKEN=${NPM_TOKEN} \
    npm_config_fund=false \
    npm_config_audit=false \
    npm_config_foreground_scripts=true \
    NPM_CONFIG_LOGLEVEL=verbose \
    NODE_OPTIONS=--max-old-space-size=3072 \
    HUSKY=0

WORKDIR /app

# Build essentials for native deps
RUN apt-get update && apt-get install -y --no-install-recommends \
    git python3 make g++ \
  && rm -rf /var/lib/apt/lists/*

# If token provided, create minimal .npmrc (adjust registry if needed)
RUN if [ -n "$NPM_TOKEN" ]; then \
      printf "//registry.npmjs.org/:_authToken=${NPM_TOKEN}\n" > /root/.npmrc ; \
    fi

# ---------- dev ----------
FROM base AS dev
ENV NODE_ENV=development
# copy lock first for better cache
COPY package*.json ./
COPY tsconfig*.json ./
# install all deps (including dev) for dev iteration
RUN npm ci
# copy source for live dev
COPY src ./src
EXPOSE 3000
# You can override CMD in docker-compose for hot-reload; default here:
CMD ["npm", "run", "start:dev"]

# ---------- build ----------
FROM base AS build
ENV NODE_ENV=production
# copy package / lock to install exact versions
COPY package*.json ./
COPY tsconfig*.json ./
# Install all deps (including dev) because we need typescript/build tools
RUN npm ci
# copy source and build
COPY src ./src
RUN npm run build

# ---------- runtime ----------
FROM node:20-bookworm-slim AS runtime
ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}
WORKDIR /app

# Create a non-root user for security
RUN useradd --user-group --create-home --shell /bin/false appuser

# Copy only compiled artifacts + package files
COPY --from=build /app/dist ./dist
COPY package*.json ./

# Install production-only dependencies
RUN npm ci --omit=dev

# Ensure correct ownership
RUN chown -R appuser:appuser /app
USER appuser

EXPOSE 3000
CMD ["node", "dist/main"]
