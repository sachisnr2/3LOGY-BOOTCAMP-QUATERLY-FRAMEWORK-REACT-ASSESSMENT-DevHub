import { useState, useEffect } from "react";
import resourceService from "../services/resourceService";
import ResourceForm from "../components/ResourceForm";
import toast from "react-hot-toast";

const ResourcesPage = () => {
  const [resources, setResources] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingResource, setEditingResource] = useState(null);
  const [formLoading, setFormLoading] = useState(false);

  const fetchResources = async () => {
    try {
      setIsLoading(true);
      const data = await resourceService.getAll();
      setResources(data);
    } catch (err) {
      toast.error("Failed to load resources");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchResources();
  }, []);

  const handleCreate = async (data) => {
    setFormLoading(true);
    try {
      const submitData = {
        ...data,
        tags: data.tags ? data.tags.join(", ") : ""
      };
      const newResource = await resourceService.create(submitData);
      setResources([newResource, ...resources]);
      setShowForm(false);
      toast.success("Resource added successfully!");
    } catch (err) {
      const errorMsg = err.errors 
        ? Object.values(err.errors).flat().join(", ") 
        : err.message || "Failed to add resource";
      toast.error(errorMsg);
    } finally {
      setFormLoading(false);
    }
  };

  const handleUpdate = async (id, data) => {
    setFormLoading(true);
    try {
      const submitData = {
        ...data,
        tags: data.tags ? data.tags.join(", ") : ""
      };
      const updated = await resourceService.update(id, submitData);
      setResources(resources.map(r => r.id === id ? updated : r));
      setShowForm(false);
      setEditingResource(null);
      toast.success("Resource updated!");
    } catch (err) {
      const errorMsg = err.errors 
        ? Object.values(err.errors).flat().join(", ") 
        : err.message || "Failed to update resource";
      toast.error(errorMsg);
    } finally {
      setFormLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this resource?")) return;
    try {
      await resourceService.remove(id);
      setResources(resources.filter(r => r.id !== id));
      toast.success("Resource deleted!");
    } catch (err) {
      toast.error(err.message || "Failed to delete resource");
    }
  };

  const handleEdit = (resource) => {
    setEditingResource(resource);
    setShowForm(true);
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingResource(null);
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-end mb-10">
          <div>
            <h1 className="text-5xl font-bold">Resources</h1>
            <p className="text-gray-400 mt-2">Curated learning materials</p>
          </div>
          <button
            onClick={() => { setEditingResource(null); setShowForm(true); }}
            className="bg-gradient-to-r from-indigo-600 to-purple-600 px-8 py-4 rounded-2xl font-semibold flex items-center gap-3 hover:brightness-110 transition"
          >
            + New Resource
          </button>
        </div>

        {showForm && (
          <ResourceForm
            initialData={editingResource}
            onSubmit={editingResource ? (data) => handleUpdate(editingResource.id, data) : handleCreate}
            onCancel={handleCancel}
            isLoading={formLoading}
          />
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {resources.map((resource) => (
            <div key={resource.id} className="bg-gray-900 border border-gray-800 rounded-3xl p-8 hover:border-indigo-500 transition">
              <div className="flex justify-between items-start">
                <span className="px-4 py-1 bg-gray-800 text-xs rounded-full capitalize">{resource.type}</span>
                <div className="flex gap-4">
                  <button onClick={() => handleEdit(resource)} className="text-indigo-400 hover:text-white">Edit</button>
                  <button onClick={() => handleDelete(resource.id)} className="text-red-400 hover:text-white">Delete</button>
                </div>
              </div>

              <h3 className="font-semibold text-xl mt-6">{resource.title}</h3>
              <a href={resource.url} target="_blank" rel="noopener noreferrer" className="text-indigo-400 hover:underline break-all block mt-3">
                {resource.url}
              </a>

              {resource.notes && <p className="text-gray-400 mt-4 line-clamp-3">{resource.notes}</p>}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ResourcesPage;