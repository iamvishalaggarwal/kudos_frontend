# KudoSphere - Kudos App Frontend

**KudoSphere** is a recognition platform where team members can appreciate each other’s efforts by giving **Kudos**. This is the frontend application built using modern web technologies and integrates seamlessly with the Django backend via secured REST APIs using JWT authentication.

---

## Tech Stack

- React.js (via Vite)
- Redux Toolkit + RTK Query
- React Router DOM
- Material UI (MUI)
- JWT for authentication
- ESLint (for code quality)

---

## Prerequisites

Ensure you have the following installed:

- **Node.js** (v18 or later)
- **npm** or **yarn**
- A code editor (e.g., VS Code)
- Backend API running (refer to backend [README](https://github.com/iamvishalaggarwal/kudos_backend/blob/master/README.md))

---

## Installation

### 1. Clone the Repository

```bash
git clone https://github.com/iamvishalaggarwal/kudos_frontend.git
cd kudos_frontend
```

### 2. Install Dependencies

```bash
npm install
# or
yarn install
```

### 3. Environment Variables

Create a `.env` file in the root directory and add (if unavailable):

```env
VITE_API_BASE_URL=http://localhost:8000/api
```

> Make sure your backend is running on the specified URL.

---

## Running the App

```bash
npm run dev
# or
yarn dev
```

Visit [http://localhost:5173](http://localhost:5173) in your browser.

---

## Authentication

- The login endpoint (`/api/auth/login/`) is publicly accessible.
- All other routes require a **JWT token**.
- Tokens are stored in `localStorage` and injected automatically using **RTK Query**.

---

## Project Structure

```folder
src/
├── app/                 # Redux store configuration
├── components/          # Reusable UI components
├── features/            # Redux features and APIs
├── hooks/               # Custom Hooks
├── pages/               # Route-based components
├── routes/              # App routing
├── utils/               # Helpers and utils
├── App.jsx              # Root component
└── main.jsx             # Entry point
```

---

## Features

- **Login Page** – Authenticate and store JWT token.
- **Users List** – Display all users (same organization) with "Give Kudos" button.
- **Give Kudos Dialog** – Write custom messages and send kudos.
- **Dashboard** – View your profile, remaining kudos, and received kudos.
- **Search** – Filter users by name or organization.

---

## Build for Production

```bash
npm run build
# or
yarn build
```

---

## Frontend Repository

To access and set up the backend, please refer to the [KudoSphere Backend](https://github.com/iamvishalaggarwal/kudos_backend).
