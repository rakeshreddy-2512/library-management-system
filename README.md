# Library Management System (MERN + Tailwind)

A modern full-stack Library Management System built with **React**, **Tailwind CSS**, **Node.js**, **Express**, and **MongoDB**.

## Features

- 🔐 JWT authentication with role-aware access (`admin`, `librarian`, `member`)
- 📚 Book management (add/list/update/delete)
- 🔎 Smart search by title, author, ISBN + category filtering
- 📥 Issue tracking (issue books to members)
- 📤 Return tracking with automatic stock update
- 💸 Fine calculation for overdue returns (configurable per-day amount)
- 📊 Admin/Librarian dashboard statistics (books, active issues, overdue count, total fines)
- 🎨 Responsive modern UI with Tailwind CSS

## Tech Stack

### Frontend
- React (Vite)
- React Router
- Tailwind CSS
- Axios

### Backend
- Node.js
- Express.js
- MongoDB + Mongoose
- JWT + bcryptjs
- express-validator

## Project Structure

```bash
library-management-system/
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   └── utils/
└── frontend/
    └── src/
```

## Setup Instructions

### 1) Install dependencies

```bash
npm install
npm run install:all
```

### 2) Configure environment

```bash
cp backend/.env.example backend/.env
```

Update `backend/.env` values as needed.

### 3) Run in development

```bash
npm run dev
```

- Backend: `http://localhost:5000`
- Frontend: `http://localhost:5173`

## API Overview

### Auth
- `POST /api/auth/register`
- `POST /api/auth/login`

### Books
- `GET /api/books?q=search&category=...`
- `POST /api/books`
- `PUT /api/books/:id`
- `DELETE /api/books/:id`

### Issue / Return
- `GET /api/issues`
- `GET /api/issues/dashboard/stats`
- `POST /api/issues`
- `PUT /api/issues/:id/return`

## Fine Calculation Logic

Fine is computed on return:
- If returned on or before due date → `$0`
- If overdue → `lateDays × FINE_PER_DAY`

`FINE_PER_DAY` is configurable in `backend/.env`.

## Recommended Improvements

- Add input modals/selectors for books/members instead of raw IDs
- Add pagination and sorting for books/issues
- Add unit/integration tests
- Add email reminders for due/overdue books
- Dockerize for production deployments

## License

MIT
