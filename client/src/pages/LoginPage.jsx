import { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import toast from "react-hot-toast";

const LoginPage = () => {
  const { login, isLoading } = useContext(AuthContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({ email: "", password: "" });
  const [formError, setFormError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError("");

    if (!formData.email || !formData.password) {
      setFormError("Please fill in all fields");
      return;
    }

    try {
      await login(formData.email, formData.password);
      toast.success("Welcome back!");
      navigate("/dashboard");
    } catch (err) {
      toast.error(err.message || "Invalid credentials");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-indigo-950 to-gray-950 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-10">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center">
              <span className="text-4xl">📁</span>
            </div>
          </div>
          <h1 className="text-4xl font-bold text-white">DevShelf</h1>
          <p className="text-gray-400 mt-2">Your developer productivity hub</p>
        </div>

        <div className="bg-gray-900/80 backdrop-blur-xl border border-gray-700 rounded-3xl p-10 shadow-2xl">
          <h2 className="text-3xl font-semibold text-white text-center mb-2">Welcome Back</h2>
          <p className="text-gray-400 text-center mb-8">Sign in to your account</p>

          <form onSubmit={handleSubmit} className="space-y-6">
            {formError && <p className="text-red-400 text-center">{formError}</p>}

            <div>
              <label className="block text-gray-400 text-sm mb-2">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full bg-gray-800 border border-gray-700 rounded-2xl px-5 py-4 text-white focus:outline-none focus:border-indigo-500"
                placeholder="you@example.com"
                required
              />
            </div>

            <div>
              <label className="block text-gray-400 text-sm mb-2">Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full bg-gray-800 border border-gray-700 rounded-2xl px-5 py-4 text-white focus:outline-none focus:border-indigo-500"
                placeholder="••••••••"
                required
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-4 rounded-2xl font-semibold text-lg hover:brightness-110 transition disabled:opacity-70"
            >
              {isLoading ? "Signing in..." : "Login"}
            </button>
          </form>

          <p className="text-center text-gray-400 mt-8">
            Don't have an account?{" "}
            <Link to="/register" className="text-indigo-400 hover:text-indigo-300 font-medium">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;