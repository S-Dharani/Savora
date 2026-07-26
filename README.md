# Savora

Savora is an original restaurant discovery and food delivery application with a glassmorphism React UI and a Spring Boot REST API.

## Prerequisites

Java 17, Maven 3.9+, Node 20+, MySQL 8, and Redis 7 must be running locally.

## Start

1. Copy `.env.example` values into your shell environment (or configure your IDE).
2. Create the schema and seed data: `mysql -u root -p < database.sql`.
3. Run the API: `cd backend && mvn spring-boot:run`.
4. Run the client: `cd frontend && npm install && npm run dev`.

The API is served at `http://localhost:8080/api`, Swagger UI at `/swagger-ui/index.html`, and the client at `http://localhost:5173`.

Default seeded admin: `admin@savora.local` / `Admin@123`.
