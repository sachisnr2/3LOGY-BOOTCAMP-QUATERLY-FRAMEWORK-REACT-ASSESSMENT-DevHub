import api from './api';

const getAll = async () => {
  const response = await api.get('/api/snippets');
  return response.data;
};

const getById = async (id) => {
  const response = await api.get(`/api/snippets/${id}`);
  return response.data;
};

const create = async (data) => {
  try {
    console.log("Sending snippet data:", data);
    const response = await api.post('/api/snippets', data);
    return response.data;
  } catch (error) {
    console.error("=== SNIPPET CREATE ERROR ===");
    console.error(error.response?.data);
    throw error.response?.data || { message: "Failed to create snippet" };
  }
};

const update = async (id, data) => {
  try {
    const response = await api.put(`/api/snippets/${id}`, data);
    return response.data;
  } catch (error) {
    console.error("Update error:", error.response?.data);
    throw error.response?.data || { message: "Failed to update snippet" };
  }
};

const remove = async (id) => {
  await api.delete(`/api/snippets/${id}`);
  return { success: true };
};

export default {
  getAll,
  getById,
  create,
  update,
  remove,
};