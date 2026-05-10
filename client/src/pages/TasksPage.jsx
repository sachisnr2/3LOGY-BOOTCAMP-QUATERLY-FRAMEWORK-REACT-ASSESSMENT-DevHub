import { useState, useEffect } from "react";
import taskService from "../services/taskService";
import TaskForm from "../components/TaskForm";
import toast from "react-hot-toast";

const TasksPage = () => {
  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [formLoading, setFormLoading] = useState(false);
  const [filter, setFilter] = useState("all");

  const fetchTasks = async () => {
    try {
      setIsLoading(true);
      const data = await taskService.getAll();
      setTasks(data);
    } catch (err) {
      toast.error("Failed to load tasks");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const filteredTasks = tasks.filter(task => 
    filter === "all" || task.status === filter
  );

  const handleCreate = async (data) => {
    setFormLoading(true);
    try {
      const newTask = await taskService.create(data);
      setTasks([newTask, ...tasks]);
      setShowForm(false);
      toast.success("Task created successfully!");
    } catch (err) {
      const errorMsg = err.errors 
        ? Object.values(err.errors).flat().join(", ") 
        : err.message || "Failed to create task";
      toast.error(errorMsg);
    } finally {
      setFormLoading(false);
    }
  };

  const handleUpdate = async (id, data) => {
    setFormLoading(true);
    try {
      const updated = await taskService.update(id, data);
      setTasks(tasks.map(t => t.id === id ? updated : t));
      setShowForm(false);
      setEditingTask(null);
      toast.success("Task updated!");
    } catch (err) {
      const errorMsg = err.errors 
        ? Object.values(err.errors).flat().join(", ") 
        : err.message || "Failed to update task";
      toast.error(errorMsg);
    } finally {
      setFormLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this task?")) return;
    try {
      await taskService.remove(id);
      setTasks(tasks.filter(t => t.id !== id));
      toast.success("Task deleted!");
    } catch (err) {
      toast.error(err.message || "Failed to delete task");
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      const updatedTask = await taskService.updateStatus(id, newStatus);
      setTasks(tasks.map(t => t.id === id ? updatedTask : t));
      toast.success("Status updated!");
    } catch (err) {
      toast.error("Failed to update status");
    }
  };

  const handleEdit = (task) => {
    setEditingTask(task);
    setShowForm(true);
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingTask(null);
  };

  const getStatusColor = (status) => {
    if (status === "done") return "bg-green-500/20 text-green-400";
    if (status === "in-progress") return "bg-yellow-500/20 text-yellow-400";
    return "bg-gray-500/20 text-gray-400";
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-end mb-10">
          <div>
            <h1 className="text-5xl font-bold">Tasks</h1>
            <p className="text-gray-400 mt-2">Stay organized and productive</p>
          </div>
          <button
            onClick={() => { setEditingTask(null); setShowForm(true); }}
            className="bg-gradient-to-r from-indigo-600 to-purple-600 px-8 py-4 rounded-2xl font-semibold hover:brightness-110 transition"
          >
            + New Task
          </button>
        </div>

        {/* Filter Tabs */}
        <div className="flex gap-2 mb-10 bg-gray-900 p-2 rounded-3xl w-fit">
          {["all", "todo", "in-progress", "done"].map((status) => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={`px-8 py-3 rounded-2xl font-medium capitalize transition ${
                filter === status ? "bg-indigo-600 text-white" : "hover:bg-gray-800"
              }`}
            >
              {status === "all" ? "All Tasks" : status.replace("-", " ")}
            </button>
          ))}
        </div>

        {showForm && (
          <TaskForm
            initialData={editingTask}
            onSubmit={editingTask 
              ? (data) => handleUpdate(editingTask.id, data) 
              : handleCreate}
            onCancel={handleCancel}
            isLoading={formLoading}
          />
        )}

        {isLoading && <div className="text-center py-20 text-gray-400">Loading tasks...</div>}

        {!isLoading && filteredTasks.length === 0 && (
          <div className="text-center py-32">
            <p className="text-3xl text-gray-500">No tasks found</p>
          </div>
        )}

        <div className="space-y-6">
          {filteredTasks.map((task) => (
            <div key={task.id} className="bg-gray-900 border border-gray-800 rounded-3xl p-8 flex items-center justify-between hover:border-gray-700 transition">
              <div className="flex-1">
                <div className="flex items-center gap-4">
                  <h3 className="text-xl font-semibold">{task.title}</h3>
                  <span className={`px-4 py-1 text-sm rounded-2xl ${getStatusColor(task.status)}`}>
                    {task.status.replace("-", " ")}
                  </span>
                  {task.priority && (
                    <span className={`px-4 py-1 text-sm rounded-2xl ${
                      task.priority === 'high' ? 'bg-red-500/20 text-red-400' : 
                      task.priority === 'medium' ? 'bg-orange-500/20 text-orange-400' : 'bg-blue-500/20 text-blue-400'
                    }`}>
                      {task.priority}
                    </span>
                  )}
                </div>
                {task.description && <p className="text-gray-400 mt-3">{task.description}</p>}
                <div className="flex gap-6 mt-4 text-sm text-gray-500">
                  {task.project && <span>📁 {task.project}</span>}
                  {task.dueDate && <span>📅 {new Date(task.dueDate).toLocaleDateString()}</span>}
                </div>
              </div>

              <div className="flex items-center gap-6">
                <select
                  value={task.status}
                  onChange={(e) => handleStatusChange(task.id, e.target.value)}
                  className="bg-gray-800 border border-gray-700 rounded-2xl px-5 py-3 text-white"
                >
                  <option value="todo">To Do</option>
                  <option value="in-progress">In Progress</option>
                  <option value="done">Done</option>
                </select>

                <button onClick={() => handleEdit(task)} className="text-indigo-400 hover:text-white">Edit</button>
                <button onClick={() => handleDelete(task.id)} className="text-red-400 hover:text-white">Delete</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TasksPage;