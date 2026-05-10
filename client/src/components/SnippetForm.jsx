import { useState, useEffect } from "react";
import toast from "react-hot-toast";

const SnippetForm = ({ initialData = null, onSubmit, onCancel, isLoading = false }) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    code: "",
    language: "javascript",
    tags: "",
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (initialData) {
      setFormData({
        title: initialData.title || "",
        description: initialData.description || "",
        code: initialData.code || "",
        language: initialData.language || "javascript",
        tags: initialData.tags ? initialData.tags.join(", ") : "",
      });
    } else {
      setFormData({
        title: "",
        description: "",
        code: "",
        language: "javascript",
        tags: "",
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.title.trim()) newErrors.title = "Title is required";
    if (!formData.code.trim()) newErrors.code = "Code is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
  e.preventDefault();
  if (!validateForm()) {
    toast.error("Please fix the errors");
    return;
  }

  const tagsString = formData.tags 
    ? formData.tags.split(",").map(tag => tag.trim()).filter(Boolean).join(", ") 
    : "";

  const submitData = {
    ...formData,
    tags: tagsString
  };

  onSubmit(submitData);
};
  return (
    <div className="bg-gray-900 border border-gray-700 rounded-3xl p-8 mb-8">
      <h2 className="text-3xl font-bold text-white mb-8">
        {initialData ? "Edit Snippet" : "Create New Snippet"}
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
            placeholder="React Custom Hook Example"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-gray-400 text-sm mb-2">Language</label>
            <select
              name="language"
              value={formData.language}
              onChange={handleChange}
              className="w-full bg-gray-800 border border-gray-700 rounded-2xl px-5 py-4 text-white focus:border-indigo-500 focus:outline-none"
            >
              <option value="javascript">JavaScript</option>
              <option value="typescript">TypeScript</option>
              <option value="python">Python</option>
              <option value="csharp">C#</option>
              <option value="java">Java</option>
              <option value="html">HTML</option>
              <option value="css">CSS</option>
              <option value="sql">SQL</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div>
            <label className="block text-gray-400 text-sm mb-2">Tags</label>
            <input
              type="text"
              name="tags"
              value={formData.tags}
              onChange={handleChange}
              className="w-full bg-gray-800 border border-gray-700 rounded-2xl px-5 py-4 text-white focus:border-indigo-500 focus:outline-none"
              placeholder="react, hooks, frontend"
            />
          </div>
        </div>

        <div>
          <label className="block text-gray-400 text-sm mb-2">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="3"
            className="w-full bg-gray-800 border border-gray-700 rounded-2xl px-5 py-4 text-white focus:border-indigo-500 focus:outline-none"
            placeholder="What does this snippet do?"
          />
        </div>

        <div>
          <label className="block text-gray-400 text-sm mb-2">Code</label>
          <textarea
            name="code"
            value={formData.code}
            onChange={handleChange}
            rows="12"
            className="w-full bg-gray-950 border border-gray-700 rounded-2xl px-5 py-4 font-mono text-gray-200 focus:border-indigo-500 focus:outline-none"
            placeholder="// Paste your code here..."
          />
        </div>

        <div className="flex gap-4 pt-6">
          <button
            type="submit"
            disabled={isLoading}
            className="flex-1 bg-gradient-to-r from-indigo-600 to-purple-600 py-4 rounded-2xl font-semibold text-lg hover:brightness-110 disabled:opacity-70"
          >
            {isLoading ? "Saving..." : initialData ? "Update Snippet" : "Create Snippet"}
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="flex-1 border border-gray-700 py-4 rounded-2xl font-semibold hover:bg-gray-800"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default SnippetForm;