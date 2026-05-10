import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import Navbar from "./components/Navbar";

// Pages
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import DashboardPage from "./pages/DashboardPage";     
import SnippetsPage from "./pages/SnippetsPage";       
import ResourcesPage from "./pages/ResourcesPage";     
import TasksPage from "./pages/TasksPage";             
import SnippetDetailPage from "./pages/SnippetDetailPage"; 

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Navbar />
        <Toaster position="top-right" />

        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          {/* Protected Routes */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <DashboardPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/snippets"
            element={
              <ProtectedRoute>
                <SnippetsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/snippets/:id"
            element={
              <ProtectedRoute>
                <SnippetDetailPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/resources"
            element={
              <ProtectedRoute>
                <ResourcesPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/tasks"
            element={
              <ProtectedRoute>
                <TasksPage />
              </ProtectedRoute>
            }
          />

          {/* Redirect root */}
          <Route path="/" element={<LoginPage />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;