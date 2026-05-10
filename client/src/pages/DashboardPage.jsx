import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import snippetService from "../services/snippetService";
import resourceService from "../services/resourceService";
import taskService from "../services/taskService";
import toast from "react-hot-toast";

const DashboardPage = () => {
  const [stats, setStats] = useState({
    totalSnippets: 0,
    totalResources: 0,
    totalTasks: 0,
    todoTasks: 0,
    inProgressTasks: 0,
    doneTasks: 0,
  });

  const [recentSnippets, setRecentSnippets] = useState([]);
  const [recentResources, setRecentResources] = useState([]);
  const [recentTasks, setRecentTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchDashboardData = async () => {
    try {
      setIsLoading(true);
      const [snippets, resources, tasks] = await Promise.all([
        snippetService.getAll(),
        resourceService.getAll(),
        taskService.getAll()
      ]);

      const todo = tasks.filter(t => t.status === "todo").length;
      const inProgress = tasks.filter(t => t.status === "in-progress").length;
      const done = tasks.filter(t => t.status === "done").length;

      setStats({
        totalSnippets: snippets.length,
        totalResources: resources.length,
        totalTasks: tasks.length,
        todoTasks: todo,
        inProgressTasks: inProgress,
        doneTasks: done,
      });

      setRecentSnippets(snippets.slice(0, 5));
      setRecentResources(resources.slice(0, 5));
      setRecentTasks(tasks.slice(0, 5));
    } catch (err) {
      toast.error("Failed to load dashboard");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  if (isLoading) {
    return <div className="min-h-screen bg-gray-950 flex items-center justify-center text-white">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-950 text-white p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-5xl font-bold mb-2">Welcome back!</h1>
        <p className="text-gray-400 text-xl">Here's your productivity overview</p>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
          <div className="bg-gradient-to-br from-purple-600 to-indigo-600 rounded-3xl p-8">
            <div className="text-6xl font-bold">{stats.totalSnippets}</div>
            <div className="text-xl mt-2 flex items-center gap-2">
              Snippets <span className="text-2xl">💻</span>
            </div>
          </div>

          <div className="bg-gradient-to-br from-blue-600 to-cyan-600 rounded-3xl p-8">
            <div className="text-6xl font-bold">{stats.totalResources}</div>
            <div className="text-xl mt-2 flex items-center gap-2">
              Resources <span className="text-2xl">🔖</span>
            </div>
          </div>

          <div className="bg-gradient-to-br from-emerald-600 to-teal-600 rounded-3xl p-8">
            <div className="text-6xl font-bold">{stats.totalTasks}</div>
            <div className="text-xl mt-2 flex items-center gap-2">
              Tasks <span className="text-2xl">✅</span>
            </div>
          </div>
        </div>

        {/* Recent Items */}
        <div className="mt-12">
          <h2 className="text-2xl font-semibold mb-6">Recent Items</h2>
          <div className="space-y-4">
            {[...recentSnippets, ...recentResources, ...recentTasks].slice(0, 6).map((item, i) => (
              <div key={i} className="bg-gray-900 border border-gray-800 rounded-2xl p-6 flex justify-between items-center">
                <div>
                  <p className="font-medium">{item.title}</p>
                  <p className="text-sm text-gray-500">
                    {item.language || item.type || item.status}
                  </p>
                </div>
                <Link 
                  to={item.code ? `/snippets/${item.id}` : "#"} 
                  className="text-indigo-400 hover:text-indigo-300"
                >
                  View →
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;