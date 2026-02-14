# Docker Setup Guide

This guide explains how to run the Bank Backend application using Docker.

## Prerequisites

- Docker Engine (20.10 or higher)
- Docker Compose (v2.0 or higher)

## Quick Start

### Development Mode

To run the application in development mode with hot-reload:

```bash
# Start the dev service with database
docker compose up dev

# Or run in detached mode
docker compose up dev -d
```

The development server will be available at:
- API: http://localhost:3000/api
- API Documentation: http://localhost:3000/api-docs

### Production Mode

To run the application in production mode:

```bash
# Start the web service with database
docker compose up web

# Or run in detached mode
docker compose up web -d
```

The production server will be available at:
- API: http://localhost:8080/api
- API Documentation: http://localhost:8080/api-docs

## Services

The `docker-compose.yml` defines the following services:

### 1. Database (db)
- **Image**: postgres:16-alpine
- **Port**: 5432
- **Credentials**:
  - Username: `bankuser`
  - Password: `bankpass`
  - Database: `bankdb`
- **Volume**: `postgres_data` (persistent storage)

### 2. Development Server (dev)
- **Build**: Dockerfile (dev target)
- **Port**: 3000
- **Features**:
  - Hot-reload enabled
  - Source code mounted as volume
  - Development dependencies included

### 3. Production Server (web)
- **Build**: Dockerfile (runtime target)
- **Port**: 8080 (mapped to container port 3000)
- **Features**:
  - Optimized production build
  - Non-root user for security
  - Production dependencies only

## Environment Variables

The application uses the following environment variables (defined in docker-compose.yml):

```env
DB_TYPE=postgres
DB_HOST=db
DB_PORT=5432
DB_USERNAME=bankuser
DB_PASSWORD=bankpass
DB_DATABASE=bankdb
DB_SCHEMA=public
PORT=3000
```

For local development without Docker, copy `.env.example` to `.env` and modify as needed:

```bash
cp .env.example .env
```

## Common Commands

### Build images
```bash
# Build all images
docker compose build

# Build specific service
docker compose build dev
docker compose build web
```

### Start services
```bash
# Start all services
docker compose up

# Start specific service
docker compose up dev
docker compose up web

# Start in detached mode
docker compose up -d
```

### Stop services
```bash
# Stop all services
docker compose down

# Stop and remove volumes
docker compose down -v
```

### View logs
```bash
# View logs for all services
docker compose logs

# View logs for specific service
docker compose logs dev
docker compose logs web
docker compose logs db

# Follow logs
docker compose logs -f dev
```

### Access database
```bash
# Access PostgreSQL shell
docker compose exec db psql -U bankuser -d bankdb
```

### Access application shell
```bash
# Access dev container shell
docker compose exec dev sh

# Access web container shell
docker compose exec web sh
```

## Troubleshooting

### Port conflicts
If you get port conflict errors, check if the ports are already in use:

```bash
# Check port 3000
lsof -i :3000

# Check port 8080
lsof -i :8080

# Check port 5432
lsof -i :5432
```

### Database connection issues
If the application can't connect to the database:

1. Check if the database is healthy:
   ```bash
   docker compose ps
   ```

2. Check database logs:
   ```bash
   docker compose logs db
   ```

3. Restart services:
   ```bash
   docker compose down
   docker compose up
   ```

### Build issues
If you encounter build issues:

1. Clean Docker cache:
   ```bash
   docker compose build --no-cache
   ```

2. Remove old images:
   ```bash
   docker compose down --rmi all
   ```

3. Rebuild from scratch:
   ```bash
   docker compose down -v --rmi all
   docker compose build
   docker compose up
   ```

## Notes

- The git submodule `@bank-app-common` is automatically copied during the build process
- The development service mounts the source code as a volume for hot-reload functionality
- The production service uses a multi-stage build for optimized image size
- Database data is persisted in a Docker volume named `postgres_data`
- The application automatically creates database tables on startup (synchronize: true)

## Security Considerations

- Default database credentials are provided for development only
- For production deployment, use environment variables or secrets management
- The production container runs as a non-root user (appuser)
- Consider using Docker secrets for sensitive data in production
