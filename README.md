# Chat App

A real-time chat application built to demonstrate modern web development practices. This app features real-time communication, user authentication, and media storage, providing a seamless chatting experience.

## Technologies

- **Frontend**: React, Vite
- **Backend**: Express
- **Real-time Communication**: Socket.io
- **Image Storage**: AWS S3
- **CDN**: CloudFront
- **Deployment**: AWS EC2
- **Reverse Proxy**: Nginx
- **ORM**: Drizzle
- **Database**: Postgres

## Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/KrishRathor/chat.git

2. Create .env files:
    ```bash
    cp backend/.env.example backend/.env

3. Create backendurl file:
    ```bash
    cp frontend/src/example.backendurl.ts frontend/src/backendurl.ts

4. Start frontend
    ```bash
    cd frontend
    bun install
    bun run dev

   This will start frontend at port 5173

5. Start Http Backend
    ```bash
    cd backend
    bun install
    bun run dev

   This will start backend at port 5000

6. Start Socket Server
     ```bash
    cd socket
    bun install
    bun run dev

   This will start socket server at port 8000
