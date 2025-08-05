
# Career Manager Documentation

# Table of Contents
[Overview](#overview)

[Tech Stack](#tech-stack)

[Installation and Setup](#installation-and-setup)

[API Routes](#api-routes)

[Middleware](#middleware)

[Error Handling](#error-handling)

## Overview
**Career Manager** is a web application created for the Borderless Community hackathon. It is designed to help users manage their job applications and resumes. The platform allows users to:
- Track Job Applications
- Build and Export Resumes

### Key Features:
1. **Track Job Applications**  
    - Register the companies you've applied to, store job descriptions, application statuses, links, and feedback.
2. **Resume Builder and Export**  
    - Use a pre-designed template to build resumes, edit content, and export them as a PDF.

---

## Tech Stack
- **Frontend**: TypeScript, React, Vite, Tailwind CSS, shadcn/ui, Zod
- **Backend**: TypeScript, Node, Fastify, PostgreSQL, Docker
- **Testing**: Vitest

---

# Installation and Setup

Clone the repository
``` bash
git clone https://github.com/ProgramadoresSemPatria/Time-5.git
```
## Install the dependencies in their respective folders: 
``` bash cd front/ npm install
cd ..
cd back/
Npm install  
```

## Run a docker container to run PostgresSQL through docker compose:

``` bash
cd back
docker compose up
```

## Run prisma migrations
``` bash
npx prisma migrate dev
```

## Start server
``` bash
npm run dev
``` 
# API Routes


## Job Routes

### POST /jobs
Create a new job entry.

Body:

companyName (string)

application_status (enum: APPLIED, INTERVIEWING, OFFERED, REJECTED, ACCEPTED)

description (string)

link (string)

### GET /jobs/:jobId
Fetch job details by its ID.

Params:

jobId (string)

### GET /jobs
Fetch all job entries for the authenticated user.

### PUT /jobs/:jobId
Update a job entry by its ID.

Params:

jobId (string)

Body (optional):

companyName (string)

application_status (enum)

description (string)

feedback (string)

link (string)

### DELETE /jobs/:jobId
Delete a job entry by its ID.

Params:

jobId (string)

User Routes


### POST /sign-up
Register a new user.

Body:

name (string)

email (string)

password (string, min 6 characters)

### POST /sign-in
User login and JWT token generation.

Body:

email (string)

password (string)

### GET /user
Fetch the authenticated user's profile.

### PATCH /cv
Save or update the user's CV.

Body:

content (string)

# Middleware
verifyJWT
This middleware verifies the authenticity of the JWT token included in the request. It is used in protected routes to ensure that the user is authenticated.

# Error Handling
ResourceNotFoundError
Thrown when a requested resource (user/job) is not found.
Response: 404 Not Found

## General Errors

### Unauthorized: Returned when the JWT is invalid or not provided.
Response: 401 Unauthorized

### Conflict: Returned when a user attempts to sign up with an email that already exists.
Response: 409 Conflict



# Developed by

- Thales Oliveira, Gustavo Bañares e Luam Ramlow
