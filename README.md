# ProTasker

A full-stack task and project management platform designed to help users create, manage, and track their tasks efficiently.  

## ✨ Features

- **User Authentication**
  - Signup, Login, Logout  
  - Role-based access (User, Admin, etc.)  
- **Task Management**
  - Create, Update, Delete, and View tasks  
  - Track progress (In-progress, Completed, etc.)  
- **Dashboard**
  - Clean and simple UI  
  - Overview of tasks and activities  
- **Scalable Backend**
  - Built with Node.js, Express, MongoDB  
  - JWT-based authentication  
- **Frontend**
  - Built with React + Vite  
  - Modular CSS for styling  

## 🛠️ Tech Stack

- **Frontend:** React, Vite, Modular CSS  
- **Backend:** Node.js, Express.js  
- **Database:** MongoDB  
- **Authentication:** JWT (JSON Web Tokens)  
- **Version Control:** Git & GitHub  

## 🚀 Getting Started

### Prerequisites
Make sure you have installed:
- [Node.js](https://nodejs.org/) (>= 16.x recommended)
- [MongoDB](https://www.mongodb.com/try/download/community)
- Git

### Clone the Repository
```bash
git clone https://github.com/your-username/project-manager.git
cd project-manager
```
### Install Dependencies
- For backend:
  ```bash
  cd backend
  npm install
  ```
- For frontend:
  ```bash
  cd frontend
  npm install
  ```
### Setup Environment Variables
Create a ```.env``` file in your backend folder and add:
```
PORT=8000

MONGO_URI= conntect the database uri

JWT_SECRET= add the jwt secrete

JWT_SECRET_EXPIRE= add the expire time

ADMIN_INVITE_TOKEN= add your token
```
### Run the Application
- Start backend server :
  ```bash
  cd backend
  nodemon server.js
  ```
- Start frontend :
  ```bash
  cd frontend
  npm run dev
  ```
### 🤝 Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you’d like to change.
