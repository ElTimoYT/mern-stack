# MERN Course App

Simple MERN-stack application scaffold used for learning and building full-stack features (MongoDB, Express, React, Node). This repository contains a minimal, opinionated structure to run a backend API and a React frontend concurrently.

## Features
- RESTful Express API
- MongoDB (Mongoose) data layer
- React (create-react-app or equivalent) frontend
- Environment-based configuration
- Dev (concurrent) and production build support
- Basic auth and JWT-ready wiring (replace with your strategy)

## Prerequisites
- Node.js (v14+ recommended)
- npm or yarn
- MongoDB instance (local or Atlas)
- Optional: Git, Docker for containerized deployment

## Repository layout
- /server — Node/Express backend
- /client — React frontend
- /scripts or tooling files at repo root (optional)
- README (this file)

## Quick start (development)
1. Clone the repo:
    git clone <repo-url>
2. Install dependencies:
    cd server
    npm install
    cd ../client
    npm install
3. Environment variables: create `.env` files in `server` and `client` (see `.env.example` sections below).
4. Run in development (from repo root):
    npm run dev
    - Expected behavior: backend on PORT (e.g. 5000) and client on 3000 with proxy or CORS configured.

## Example .env (server)
MONGO_URI=mongodb+srv://user:password@cluster.example.mongodb.net/dbname
PORT=5000
JWT_SECRET=your_jwt_secret
NODE_ENV=development
# Optional: CLOUDINARY_URL, S3 keys, etc.

## Example .env (client)
REACT_APP_API_URL=http://localhost:5000/api
REACT_APP_OTHER_KEY=value

## Common npm scripts (examples)
- server:
  - npm run start — start production server
  - npm run dev — start server with nodemon
- client:
  - npm start — start React dev server
  - npm run build — build production bundle
- root (if configured):
  - npm run dev — run both client and server concurrently
  - npm run build — build client and prepare server for production

Adjust scripts in package.json to match your project layout.

## Building for production
1. Build client:
    cd client && npm run build
2. Serve static build from server (configure Express to serve `client/build`).
3. Start server in production mode:
    NODE_ENV=production npm start

## Testing
- Add unit/integration tests with Jest, Supertest, React Testing Library.
- Example:
  - npm run test

## Deployment hints
- For Heroku: set env vars in app settings, push server and serve client build or deploy as monorepo.
- For Vercel/Netlify: deploy frontend separately and point API URL to deployed backend.
- For Docker: create Dockerfiles for server and client or a multi-stage build.

## Contributing
- Create issues for bugs or feature requests.
- Use branches named feature/<name> or fix/<issue>.
- Open pull requests with clear description and tests where appropriate.
