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

# Initialize git submodule directory structure
RUN mkdir -p @bank-app-common

# ---------- dev ----------
FROM base AS dev
ENV NODE_ENV=development
# copy lock first for better cache
COPY package*.json ./
COPY tsconfig*.json ./
# Copy git submodule
COPY .gitmodules ./
COPY @bank-app-common ./@bank-app-common
# install all deps (including dev) for dev iteration
RUN npm config set strict-ssl false && npm install && npm config delete strict-ssl
# copy source for live dev
COPY src ./src
EXPOSE 3000
# You can override CMD in docker-compose for hot-reload; default here:
CMD ["npm", "run", "start:dev"]

# ---------- build ----------
FROM base AS build
# Don't set NODE_ENV=production yet, as we need devDependencies for build
# copy package / lock to install exact versions
COPY package*.json package-lock.json* ./
COPY tsconfig*.json ./
# Copy git submodule
COPY .gitmodules ./
COPY @bank-app-common ./@bank-app-common
# Install all deps (including dev) because we need typescript/build tools
# Set npm to use strict-ssl=false temporarily if SSL issues occur in the environment
RUN npm config set strict-ssl false && npm install && npm config delete strict-ssl
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
# COPY .env .env // Don't copy .env for security; expect it to be provided via env vars or secrets in production // use only for local testing with docker-composez

# Install production-only dependencies
RUN npm config set strict-ssl false && npm install --production && npm config delete strict-ssl

# Ensure correct ownership
RUN chown -R appuser:appuser /app
USER appuser

EXPOSE 80
CMD ["node", "dist/src/main.js"]
