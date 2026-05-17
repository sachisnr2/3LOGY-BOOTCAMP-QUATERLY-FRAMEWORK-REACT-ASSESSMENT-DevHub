# DevShelf — Developer Productivity Hub

A modern, beautiful React frontend for managing code snippets, resources, and tasks. Built as part of the 3LOGY Bootcamp React Assessment.

![DevShelf Preview](https://via.placeholder.com/800x400/4f46e5/ffffff?text=DevShelf+Dashboard)

## ✨ Features

- **🔐 Authentication** — Secure login/register with JWT
- **💾 Snippets** — Full CRUD with code preview and tags
- **🔖 Resources** — Bookmark and organize learning materials
- **✅ Tasks** — Task management with status, priority & filters
- **📊 Dashboard** — Overview with stats and recent activity
- **🌙 Dark Mode** — Beautiful dark theme with toggle
- **🎨 Modern UI** — Clean, responsive design with Tailwind CSS

## 🛠 Tech Stack

- **Frontend**: React 19, Vite, React Router v7
- **Styling**: Tailwind CSS v4
- **State**: React Context + useState
- **HTTP**: Axios with interceptors
- **Notifications**: React Hot Toast
- **Backend**: .NET 8 Web API + SQLite

## 🚀 How to Run Locally

### Backend
```bash
cd server
dotnet run
### Frontend
cd client
npm install
npm run dev

client/src/
├── components/          # SnippetCard, ResourceForm, etc.
├── context/             # AuthContext.jsx
├── pages/               # Dashboard, SnippetsPage, etc.
├── services/            # API services (auth, snippet, etc.)
├── App.jsx
└── main.jsx