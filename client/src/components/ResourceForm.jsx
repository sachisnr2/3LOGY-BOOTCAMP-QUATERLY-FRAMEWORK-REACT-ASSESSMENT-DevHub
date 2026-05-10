import { useState, useEffect } from "react";
import toast from "react-hot-toast";

const ResourceForm = ({ initialData = null, onSubmit, onCancel, isLoading = false }) => {
  const [formData, setFormData] = useState({
    title: "",
    url: "",
    notes: "",
    type: "article",
    tags: "",
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (initialData) {
      setFormData({
        title: initialData.title || "",
        url: initialData.url || "",
        notes: initialData.notes || "",
        type: initialData.type || "article",
        tags: initialData.tags ? initialData.tags.join(", ") : "",
      });
    } else {
      setFormData({
        title: "",
        url: "",
        notes: "",
        type: "article",
        tags: "",
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.title.trim()) newErrors.title = "Title is required";
    if (!formData.url.trim()) newErrors.url = "URL is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) {
      toast.error("Please fix the errors");
      return;
    }

    const tagsArray = formData.tags
      ? formData.tags.split(",").map(t => t.trim()).filter(Boolean)
      : [];

    onSubmit({ ...formData, tags: tagsArray });
  };

  return (
    <div className="bg-gray-900 border border-gray-700 rounded-3xl p-8 mb-8">
      <h2 className="text-3xl font-bold text-white mb-8">
        {initialData ? "Edit Resource" : "Add New Resource"}
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
            placeholder="Best React Course 2026"
          />
        </div>

        <div>
          <label className="block text-gray-400 text-sm mb-2">URL</label>
          <input
            type="url"
            name="url"
            value={formData.url}
            onChange={handleChange}
            className="w-full bg-gray-800 border border-gray-700 rounded-2xl px-5 py-4 text-white focus:border-indigo-500 focus:outline-none"
            placeholder="https://..."
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-gray-400 text-sm mb-2">Type</label>
            <select
              name="type"
              value={formData.type}
              onChange={handleChange}
              className="w-full bg-gray-800 border border-gray-700 rounded-2xl px-5 py-4 text-white focus:border-indigo-500 focus:outline-none"
            >
              <option value="article">Article</option>
              <option value="video">Video</option>
              <option value="tool">Tool</option>
              <option value="docs">Documentation</option>
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
              placeholder="react, tutorial"
            />
          </div>
        </div>

        <div>
          <label className="block text-gray-400 text-sm mb-2">Notes</label>
          <textarea
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            rows="5"
            className="w-full bg-gray-800 border border-gray-700 rounded-2xl px-5 py-4 text-white focus:border-indigo-500 focus:outline-none"
            placeholder="Additional notes about this resource..."
          />
        </div>

        <div className="flex gap-4 pt-6">
          <button
            type="submit"
            disabled={isLoading}
            className="flex-1 bg-gradient-to-r from-indigo-600 to-purple-600 py-4 rounded-2xl font-semibold text-lg hover:brightness-110 disabled:opacity-70"
          >
            {isLoading ? "Saving..." : initialData ? "Update Resource" : "Add Resource"}
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

export default ResourceForm;