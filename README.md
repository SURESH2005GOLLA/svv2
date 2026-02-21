# Secure and Reliable Login System

This project implements a secure login system with a React frontend, an Express backend, and Cucumber BDD tests for functional and boundary validation.

## Structure

- `/frontend`: React application (Vite, TypeScript, Vanilla CSS).
- `/backend`: Express.js server with JWT and Bcrypt.
- `/tests`: Cucumber features and Step Definitions using Playwright.

## How to Run

### 1. Backend
```bash
cd backend
npm install
node server.js
```
The server will run on `http://localhost:5000`.

### 2. Frontend
```bash
cd frontend
npm install
npm run dev -- --port 5173
```
The application will run on `http://localhost:5173`.

### 3. Tests
```bash
cd tests
npm install
npx cucumber-js
```

## Features Tested

### Functional Testing
- Successful login with valid credentials (`admin` / `password123`).
- Failed login with incorrect password.

### Boundary Testing
- Empty username or password.
- Extremely long inputs (over 50 characters).

## Security Features
- **Password Hashing**: Uses `bcryptjs` to store passwords securely.
- **Session Management**: Uses `jsonwebtoken` (JWT) for secure authentication.
- **Input Validation**: Backend checks for empty fields and maximum character lengths.
- **Modern UI**: High-end glassmorphism design with responsive interactions.
