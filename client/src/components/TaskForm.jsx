import { useState, useEffect } from "react";
import toast from "react-hot-toast";

const TaskForm = ({ initialData = null, onSubmit, onCancel, isLoading = false }) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    status: "todo",
    priority: "medium",
    project: "",
    dueDate: "",
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        title: initialData.title || "",
        description: initialData.description || "",
        status: initialData.status || "todo",
        priority: initialData.priority || "medium",
        project: initialData.project || "",
        dueDate: initialData.dueDate ? initialData.dueDate.split('T')[0] : "",
      });
    } else {
      setFormData({
        title: "",
        description: "",
        status: "todo",
        priority: "medium",
        project: "",
        dueDate: "",
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title.trim()) {
      toast.error("Title is required");
      return;
    }
    onSubmit(formData);
  };

  return (
    <div className="bg-gray-900 border border-gray-700 rounded-3xl p-8 mb-8">
      <h2 className="text-3xl font-bold text-white mb-8">
        {initialData ? "Edit Task" : "New Task"}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-gray-400 text-sm mb-2">Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full bg-gray-800 border border-gray-700 rounded-2xl px-5 py-4 text-white focus:border-indigo-500 focus:outline-none"
            placeholder="Complete user authentication"
          />
        </div>

        <div>
          <label className="block text-gray-400 text-sm mb-2">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="4"
            className="w-full bg-gray-800 border border-gray-700 rounded-2xl px-5 py-4 text-white focus:border-indigo-500 focus:outline-none"
            placeholder="Task details..."
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-gray-400 text-sm mb-2">Status</label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full bg-gray-800 border border-gray-700 rounded-2xl px-5 py-4 text-white focus:border-indigo-500 focus:outline-none"
            >
              <option value="todo">To Do</option>
              <option value="in-progress">In Progress</option>
              <option value="done">Done</option>
            </select>
          </div>

          <div>
            <label className="block text-gray-400 text-sm mb-2">Priority</label>
            <select
              name="priority"
              value={formData.priority}
              onChange={handleChange}
              className="w-full bg-gray-800 border border-gray-700 rounded-2xl px-5 py-4 text-white focus:border-indigo-500 focus:outline-none"
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-gray-400 text-sm mb-2">Project</label>
            <input
              type="text"
              name="project"
              value={formData.project}
              onChange={handleChange}
              className="w-full bg-gray-800 border border-gray-700 rounded-2xl px-5 py-4 text-white focus:border-indigo-500 focus:outline-none"
              placeholder="DevShelf Frontend"
            />
          </div>

          <div>
            <label className="block text-gray-400 text-sm mb-2">Due Date</label>
            <input
              type="date"
              name="dueDate"
              value={formData.dueDate}
              onChange={handleChange}
              className="w-full bg-gray-800 border border-gray-700 rounded-2xl px-5 py-4 text-white focus:border-indigo-500 focus:outline-none"
            />
          </div>
        </div>

        <div className="flex gap-4 pt-6">
          <button
            type="submit"
            disabled={isLoading}
            className="flex-1 bg-gradient-to-r from-indigo-600 to-purple-600 py-4 rounded-2xl font-semibold text-lg hover:brightness-110 disabled:opacity-70"
          >
            {isLoading ? "Saving..." : initialData ? "Update Task" : "Create Task"}
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="flex-1 border border-gray-700 py-4 rounded-2xl font-semibold hover:bg-gray-800 text-white"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default TaskForm;