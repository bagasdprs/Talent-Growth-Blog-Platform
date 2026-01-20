# 🚀 Talent Growth Blog Platform

A modern, full-stack blogging platform designed for professionals to share insights. Built with the **MERN Stack** (MongoDB, Express, React, Node.js) and styled with **Tailwind CSS**.

## ✨ Features

- **Authentication**: Secure Login & Register using JWT (JSON Web Tokens).
- **Rich Text Editor**: Create and edit beautiful posts using a WYSIWYG editor.
- **User Dashboard**: Manage your profile and view your own article history.
- **Public Feed**: Explore articles from all users with category tags.
- **CRUD Operations**: Create, Read, Update, and Delete posts seamlessly.
- **Responsive Design**: Optimized for desktop and mobile using Tailwind CSS.

## 🛠️ Tech Stack

- **Frontend**: React (Vite), Tailwind CSS, React Router, React Hook Form, React Hot Toast, Lucide Icons.
- **Backend**: Node.js, Express.js.
- **Database**: MongoDB (Mongoose ODM).
- **Authentication**: JWT & BcryptJS.

## 🚀 Getting Started

Follow these steps to run the project locally.

### Prerequisites

- Node.js installed.
- MongoDB installed and running locally.

### 1. Clone the Repository

```bash
git clone [https://github.com/username/talent-growth-blog.git](https://github.com/username/talent-growth-blog.git)
cd talent-growth-blog
```

### 2. Backend Setup

```bash
cd backend
npm install
```

**Create a `.env` file in the `backend` folder:**

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/talent-growth-blog
JWT_SECRET=your_super_secret_key_here
```

**Run the Server:**

```bash
npm run dev
```

_(Server will run on http://localhost:5000)_

### 3. Frontend Setup

Open a new terminal.

```bash
cd frontend
npm install
npm run dev
```

_(App will run on http://localhost:5173)_

## 📂 Project Structure

```
root/
├── backend/         # API & Database Logic
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   └── server.js
└── frontend/        # React UI
    ├── src/
    │   ├── pages/
    │   ├── components/
    │   └── services/
    └── tailwind.config.js
```

---

Built with ❤️ by **Bagas Dwiprasandi**
