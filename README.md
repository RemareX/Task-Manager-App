📝 Task Manager App

A full-stack MERN (MongoDB, Express, React, Node.js) application that allows users to register, log in, and manage their tasks. Users can add, edit, delete, and mark tasks as completed, with authentication-protected routes.


**********************************************
🚀 Features

User Authentication (JWT-based)
Add, Edit, Delete Tasks
Mark Tasks as Pending / In Progress / Completed
Protected Routes (only logged-in users can access tasks)
Loading States & Confirmation Prompts
Environment Variable Support for API URLs and secrets


**********************************************
📂 Tech Stack

Frontend: React, Axios, React Router
Backend: Node.js, Express.js, MongoDB, Mongoose, JWT
Database: MongoDB Atlas / Local MongoDB
Authentication: JSON Web Token (JWT)


**********************************************
⚙️ Installation & Setup

1️⃣ Clone the Repository
git clone https://github.com/yourusername/task-manager.git
cd task-manager

2️⃣ Backend Setup
cd backend
npm install


Create a .env file in the backend folder:

PORT = 5000
MONGO_URI = your_mongodb_connection
JWT_SECRET = your_jwt_secret_key
JWT_EXPIRES_IN = 30d


Run backend server:
npm run dev

3️⃣ Frontend Setup
cd frontend
npm install


Create a .env file in the frontend folder:
REACT_APP_API_URL=http://localhost:5000/api


Run frontend server:
npm start


**********************************************
📌 API Routes

Auth Routes:
POST /api/users/register → Register a new user
POST /api/users/login → Login and get token
GET /api/users/profile → Get logged-in user details
Task Routes: (Protected)
POST /api/tasks → Create task
GET /api/tasks → Get all user tasks
GET /api/tasks/:id → Get task by ID
PUT /api/tasks/:id → Update task
DELETE /api/tasks/:id → Delete task