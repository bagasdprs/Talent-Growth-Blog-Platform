# 🚀 Talent Growth Blog Platform

A modern, full-stack blogging platform designed for professionals to share insights. Built with the **MERN Stack** (MongoDB, Express, React, Node.js) and styled with **Tailwind CSS**.

## ✨ Features

- **Authentication**: Secure Login & Register using JWT (JSON Web Tokens).
- **Rich Text Editor**: Create and edit beautiful posts using a WYSIWYG editor.
- **User Dashboard**: Manage your profile and view your own article history.
- **Public Feed**: Explore articles from all users with category tags.
- **Interactive Comments**: Engage with content by adding, deleting, and viewing comments.
- **CRUD Operations**: Create, Read, Update, and Delete posts seamlessly.
- **Responsive Design**: Optimized for desktop and mobile using Tailwind CSS v4.

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

## 📡 API Endpoints

The backend provides the following RESTful API endpoints:

### Authentication

- `POST /auth/register` - Register a new user with name, email, and password.
- `POST /auth/login` - Login to receive a JWT token for session management.

### Posts

- `GET /posts` - Retrieve all blog posts (Public access).
- `GET /posts/:id` - Retrieve full details of a single post.
- `POST /posts` - Create a new blog post (Authentication required).
- `PUT /posts/:id` - Update an existing post (Author only).
- `DELETE /posts/:id` - Delete a post permanently (Author only).

### Comments

- `GET /posts/:id/comments` - Retrieve all comments associated with a specific post.
- `POST /posts/:id/comments` - Add a new comment to a post (Authentication required).
- `DELETE /comments/:id` - Delete a specific comment (Author only).

## 💡 Assumptions & Design Decisions

In developing this application, several key architectural decisions were made to ensure scalability, security, and maintainability:

1.  **Authentication Strategy (JWT)**

    - **Decision:** I implemented JSON Web Tokens (JWT) for stateless authentication instead of server-side sessions.
    - **Reasoning:** This allows the backend to remain scalable and aligns with modern REST API standards. The token is stored in the client's LocalStorage to persist the login state across page reloads.

2.  **Authorization Middleware**

    - **Decision:** Custom middleware was created to verify post/comment ownership before allowing `UPDATE` or `DELETE` actions.
    - **Reasoning:** To strictly enforce the rule that users can only manage their own content, preventing unauthorized modifications.

3.  **Database Schema (Referencing)**

    - **Decision:** The MongoDB schema uses referencing (`ObjectId`) to link Posts and Comments to Users, rather than embedding data.
    - **Reasoning:** This keeps the database normalized and makes it efficient to populate author details (like name and avatar) dynamically when fetching posts or comments.

4.  **Frontend Styling (Tailwind CSS)**

    - **Decision:** Tailwind CSS was chosen over traditional CSS or component libraries (like Bootstrap).
    - **Reasoning:** To ensure a fully responsive design for mobile and desktop as required, while allowing for rapid UI development without writing custom CSS files.

5.  **Rich Text Handling**
    - **Decision:** Integrated a WYSIWYG editor (`react-quill`) for post creation.
    - **Reasoning:** To provide a better user experience for writing blog content with formatting (bold, lists, etc.), where the content is stored as sanitized HTML strings in the database.

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
