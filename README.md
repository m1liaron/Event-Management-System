
---

# Event Management System (PoC)

A full-stack Event Management Application built with **React (Vite)**, **NestJS**, and **PostgreSQL**. This project demonstrates a simplified flow for creating, joining, and managing public and private events.

## 🚀 Quick Start (One-Command Launch)

The entire stack (Frontend, Backend, and Database) is containerized. To start the application, ensure you have **Docker** and **Docker Compose** installed, then run:

```bash
docker-compose up --build
```

* **Frontend:** `http://localhost:3000`
* **Backend API:** `http://localhost:4000`
* **API Documentation (Swagger):** `http://localhost:4000/api`

---

## 🛠 Tech Stack

### Frontend

* **Framework:** React 18+ (Vite)
* **Language:** TypeScript
* **State Management:** Zustand
* **Styling:** Tailwind CSS
* **Linter/Formatter:** BiomeJS

### Backend

* **Framework:** NestJS
* **Database:** PostgreSQL
* **ORM:** TypeORM
* **Auth:** JWT (Passport)
* **Validation:** Class-validator / DTOs
* **Linter/Formatter:** BiomeJS

---

## 📂 Project Structure

```text
.
├── frontend/               # React application
├── backend/                # NestJS application
├── docker-compose.yml      # Orchestration for all services
├── .env                    # Root environment variables
└── README.md

```

---

## ⚙️ Configuration (.env)

The project uses a centralized `.env` file at the root. Create a file named `.env` and use the following template:

```env
# --- DATABASE ---
POSTGRES_USER=postgres
POSTGRES_PASSWORD=mysecretpass
POSTGRES_DB=event_db
DB_HOST=db
DB_PORT=5432

# --- BACKEND ---
JWT_SECRET=super_secret_key_123
BACKEND_PORT=4000

# --- FRONTEND ---
VITE_API_URL=http://localhost:4000

```

---

## 🛠 Manual Development Setup

If you wish to run the services locally without Docker:

### 1. Database

Ensure you have a PostgreSQL instance running with the credentials provided in your `.env`.

### 2. Backend

```bash
cd backend
npm install
npm run start:dev

```

### 3. Frontend

```bash
cd frontend
npm install
npm run dev

```

---

## 🧪 Seeding & Testing

Upon the first launch via Docker, the database is automatically synchronized via TypeORM.

* **Default Users:** `admin@example.com` / `Password123!`
* **To run tests:** `cd backend && npm run test`

---

## 📝 Features Implemented

* [ ] **JWT Auth:** Secure Sign-up/Login with hashed passwords.
* [ ] **Public Event List:** View, Join, and Leave events with real-time capacity updates.
* [ ] **Event Management:** Organizers can Create, Edit, and Delete events.
* [ ] **Calendar View:** Monthly/Weekly view for joined events using `react-calendar`.
* [ ] **Responsive UI:** Fully optimized for Mobile and Desktop via Tailwind.

---

## 🤝 Version Control

This project follows a professional Git workflow:

1. Features developed on `develop` branch.
---