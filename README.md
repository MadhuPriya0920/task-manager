# TaskFlow — Full Stack Task Manager Application

A production-ready, full stack Task Manager web application built with React, Node.js, Express, and MongoDB. Designed for real-world use with JWT authentication, full CRUD operations, and a clean modern UI.

---

## Live Demo

- **Frontend:** https://task-manager-black-xi.vercel.app
- **Backend API:** https://task-manager-backend-web.onrender.com

---

## Features

- User Registration and Login with JWT Authentication
- Protected Routes — only logged-in users can access the dashboard
- Create, Read, Update, and Delete Tasks
- Mark tasks as Complete or Pending
- Set Priority levels — Low, Medium, High
- Set Due Dates with overdue indicators
- Search tasks by title or description
- Filter tasks by status and priority
- Dashboard stats — Total, Pending, and Completed task counts
- Fully Responsive Design — works on mobile and desktop
- Toast notifications for all actions

---

## Tech Stack

### Frontend
- React (Vite)
- Tailwind CSS
- Axios
- React Router DOM
- React Hot Toast
- Lucide React Icons

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- JSON Web Token (JWT)
- bcryptjs
- CORS

### Database
- MongoDB Atlas (Cloud)

### Deployment
- Frontend — Vercel
- Backend — Render
- Database — MongoDB Atlas

### Version Control
- Git and GitHub

---

## Project Structure

```
task-manager/
├── backend/
│   ├── config/
│   │   └── db.js
│   ├── controllers/
│   │   ├── authController.js
│   │   └── taskController.js
│   ├── middleware/
│   │   └── authMiddleware.js
│   ├── models/
│   │   ├── User.js
│   │   └── Task.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   └── taskRoutes.js
│   ├── .env
│   └── server.js
└── frontend/
    └── src/
        ├── api/
        │   └── axios.js
        ├── components/
        │   ├── Navbar.jsx
        │   ├── TaskCard.jsx
        │   ├── TaskForm.jsx
        │   └── ProtectedRoute.jsx
        ├── context/
        │   └── AuthContext.jsx
        ├── pages/
        │   ├── Login.jsx
        │   ├── Register.jsx
        │   └── Dashboard.jsx
        ├── App.jsx
        └── main.jsx
```

---

## API Endpoints

### Auth Routes
| Method | Endpoint | Description |
|--------|------------------|----------------------|
| POST | /api/auth/register | Register a new user |
| POST | /api/auth/login | Login and get token |

### Task Routes (Protected)
| Method | Endpoint | Description |
|--------|--------------------------|----------------------|
| GET | /api/tasks | Get all tasks |
| POST | /api/tasks | Create a new task |
| PUT | /api/tasks/:id | Update a task |
| DELETE | /api/tasks/:id | Delete a task |
| PATCH | /api/tasks/:id/toggle | Toggle complete status |

---

## Getting Started Locally

### Prerequisites
- Node.js
- MongoDB (local) or MongoDB Atlas account
- Git

### Clone the Repository
```bash
git clone https://github.com/MadhuPriya0920/task-manager.git
cd task-manager
```

### Backend Setup
```bash
cd backend
npm install
```

Create a `.env` file inside the `backend` folder:
```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/taskmanager
JWT_SECRET=your_secret_key
NODE_ENV=development
```

Start the backend:
```bash
npm run dev
```

### Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

Open `http://localhost:5173` in your browser.

---

## Environment Variables

### Backend `.env`
| Variable | Description |
|--------------|-------------------------------|
| PORT | Server port (default 5000) |
| MONGO_URI | MongoDB connection string |
| JWT_SECRET | Secret key for JWT tokens |
| NODE_ENV | development or production |

---

## Deployment

| Service | Platform | URL |
|----------|----------|------------------------------------|
| Frontend | Vercel | https://task-manager-black-xi.vercel.app |
| Backend | Render | https://task-manager-backend-web.onrender.com |
| Database | MongoDB Atlas | Cloud hosted |

---

## Screenshots

### Login Page
Clean and minimal login form with JWT-based authentication.

### Dashboard
Displays task statistics, search, filters, and task cards.

### Task Management
Create, edit, delete, and toggle tasks with priority and due date support.

---

## Author

**Madhu Priya K B**
- GitHub: [@MadhuPriya0920](https://github.com/MadhuPriya0920)

---

## License

This project is open source and available under the [MIT License](LICENSE).
