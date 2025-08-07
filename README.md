# Mini-LinkedIn Platform

A simple full-stack Mini LinkedIn-like platform built with React, Tailwind CSS (frontend), and Express.js, MongoDB (backend).

---

## Features

### Frontend (React + Tailwind CSS)

* User Authentication (Signup, Login)
* Profile Display with Image
* Create/View/Delete Posts (called "Books")
* Responsive Design

### Backend (Node.js + Express + MongoDB)

* JWT-based Authentication
* RESTful APIs:

  * `/api/auth` - User Signup/Login
  * `/api/books` - Create/View/Delete Posts
* MongoDB using Mongoose ODM

---

## File Structure

```
mini-linkedin/
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── .env
│   └── index.js
├── frontend/
│   ├── public/
│   └── src/
│       ├── components/
│       ├── pages/
│       ├── App.jsx
│       ├── main.jsx
│       └── index.css
├── README.md
```

---

## Installation

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/mini-linkedin.git
cd mini-linkedin
```

### 2. Backend Setup

```bash
cd backend
npm install
```

#### Create `.env` in backend/

```env
PORT=5000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
```

#### Run Backend

```bash
npm run dev
```

### 3. Frontend Setup

```bash
cd ../frontend
npm install
npm run dev
```

---

## Build Frontend

```bash
npm run build
```

> Make sure you fix any import path errors (e.g., `../../backend/Profile`) before building.

---

## Common Errors & Fixes

### ENOENT: package.json not found

Make sure you're inside the correct directory (e.g., `frontend` or `backend`) before running `npm run build` or `npm install`.

### Could not resolve "../../backend/Profile"

Double-check import paths in `App.jsx`. Avoid importing backend files into frontend.

---

## License

This project is licensed under the MIT License.

---

## Author

Sajid Ansari
