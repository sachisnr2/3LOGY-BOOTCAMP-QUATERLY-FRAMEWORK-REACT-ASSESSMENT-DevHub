import { useState, useEffect } from "react";
import snippetService from "../services/snippetService";
import SnippetCard from "../components/SnippetCard";
import SnippetForm from "../components/SnippetForm";
import toast from "react-hot-toast";

const SnippetsPage = () => {
  const [snippets, setSnippets] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingSnippet, setEditingSnippet] = useState(null);
  const [formLoading, setFormLoading] = useState(false);

  const fetchSnippets = async () => {
    try {
      setIsLoading(true);
      const data = await snippetService.getAll();
      setSnippets(data);
    } catch (err) {
      toast.error("Failed to load snippets");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchSnippets();
  }, []);

  const handleCreate = async (data) => {
    setFormLoading(true);
    try {
      const newSnippet = await snippetService.create(data);
      setSnippets([newSnippet, ...snippets]);
      setShowForm(false);
      toast.success("Snippet created successfully!");
    } catch (err) {
      console.error(err);
      const errorMsg = err.errors 
        ? Object.values(err.errors).flat().join(", ") 
        : err.message || err.title || "Failed to create snippet";
      toast.error(errorMsg);
    } finally {
      setFormLoading(false);
    }
  };

  const handleUpdate = async (id, data) => {
    setFormLoading(true);
    try {
      const updated = await snippetService.update(id, data);
      setSnippets(snippets.map(s => s.id === id ? updated : s));
      setShowForm(false);
      setEditingSnippet(null);
      toast.success("Snippet updated successfully!");
    } catch (err) {
      const errorMsg = err.errors 
        ? Object.values(err.errors).flat().join(", ") 
        : err.message || err.title || "Failed to update snippet";
      toast.error(errorMsg);
    } finally {
      setFormLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this snippet?")) return;
    try {
      await snippetService.remove(id);
      setSnippets(snippets.filter(s => s.id !== id));
      toast.success("Snippet deleted!");
    } catch (err) {
      toast.error(err.message || "Failed to delete snippet");
    }
  };

  const handleEdit = (snippet) => {
    setEditingSnippet(snippet);
    setShowForm(true);
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingSnippet(null);
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-end mb-10">
          <div>
            <h1 className="text-5xl font-bold">Snippets</h1>
            <p className="text-gray-400 mt-2">Reusable code blocks</p>
          </div>
          <button
            onClick={() => { setEditingSnippet(null); setShowForm(true); }}
            className="bg-gradient-to-r from-indigo-600 to-purple-600 px-8 py-4 rounded-2xl font-semibold flex items-center gap-3 hover:brightness-110 transition"
          >
            + New Snippet
          </button>
        </div>

        {showForm && (
          <SnippetForm
            initialData={editingSnippet}
            onSubmit={editingSnippet ? (data) => handleUpdate(editingSnippet.id, data) : handleCreate}
            onCancel={handleCancel}
            isLoading={formLoading}
          />
        )}

        {isLoading && <div className="text-center py-20 text-gray-400">Loading snippets...</div>}

        {!isLoading && snippets.length === 0 && !showForm && (
          <div className="text-center py-32">
            <p className="text-3xl text-gray-500">No snippets yet</p>
            <p className="text-gray-600 mt-4">Create your first one above</p>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {snippets.map((snippet) => (
            <SnippetCard
              key={snippet.id}
              snippet={snippet}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SnippetsPage;