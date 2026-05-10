import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const SnippetCard = ({ snippet, onEdit, onDelete }) => {
  const navigate = useNavigate();

  const handleDelete = () => {
    if (window.confirm("Delete this snippet?")) {
      onDelete(snippet.id);
    }
  };

  const copyCode = () => {
    if (snippet.code) {
      navigator.clipboard.writeText(snippet.code);
      toast.success("Code copied!");
    }
  };

  return (
    <div className="group bg-gray-900 border border-gray-800 rounded-3xl overflow-hidden hover:border-indigo-500 transition-all">
      <div className="p-8">
        <div className="flex justify-between items-start mb-6">
          <div 
            onClick={() => navigate(`/snippets/${snippet.id}`)}
            className="cursor-pointer hover:text-indigo-400 transition flex-1"
          >
            <h3 className="text-xl font-semibold line-clamp-2 pr-4">
              {snippet.title || "Untitled Snippet"}
            </h3>
          </div>
          <span className="px-4 py-1.5 bg-gray-800 text-xs font-medium rounded-2xl text-indigo-400 whitespace-nowrap">
            {snippet.language || "other"}
          </span>
        </div>

        {snippet.description && (
          <p className="text-gray-400 text-sm line-clamp-2 mb-6">
            {snippet.description}
          </p>
        )}

        {/* Code Preview */}
        {snippet.code && (
          <div className="relative bg-gray-950 border border-gray-800 rounded-2xl p-5 font-mono text-sm text-gray-300 mb-6 h-36 overflow-hidden">
            <pre className="whitespace-pre-wrap break-words">
              {snippet.code.length > 180 
                ? snippet.code.substring(0, 180) + "..." 
                : snippet.code}
            </pre>
            <button
              onClick={copyCode}
              className="absolute top-4 right-4 bg-gray-800 hover:bg-gray-700 px-4 py-1.5 rounded-xl text-xs transition"
            >
              Copy
            </button>
          </div>
        )}

        {/* Tags */}
        {snippet.tags && (Array.isArray(snippet.tags) ? snippet.tags.length > 0 : snippet.tags) && (
          <div className="flex flex-wrap gap-2 mb-8">
            {(Array.isArray(snippet.tags) ? snippet.tags : snippet.tags.split(',').map(t => t.trim())).map((tag, i) => (
              <span key={i} className="text-xs px-4 py-1 bg-gray-800 rounded-2xl text-gray-400">
                #{tag}
              </span>
            ))}
          </div>
        )}

        <div className="flex justify-between items-center pt-4 border-t border-gray-800 text-sm">
          <span className="text-gray-500">
            {snippet.createdAt 
              ? new Date(snippet.createdAt).toLocaleDateString() 
              : "Recently"}
          </span>
          
          <div className="flex gap-4">
            <button
              onClick={() => onEdit(snippet)}
              className="text-indigo-400 hover:text-indigo-300 font-medium"
            >
              Edit
            </button>
            <button
              onClick={handleDelete}
              className="text-red-400 hover:text-red-300 font-medium"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SnippetCard;