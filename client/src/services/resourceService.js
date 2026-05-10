import api from './api';

const getAll = async () => {
  const response = await api.get('/api/resources');
  return response.data;
};

const create = async (data) => {
  try {
    const response = await api.post('/api/resources', data);
    return response.data;
  } catch (error) {
    console.error("Resource Create Error:", error.response?.data);
    throw error.response?.data || { message: "Failed to create resource" };
  }
};

const update = async (id, data) => {
  try {
    const response = await api.put(`/api/resources/${id}`, data);
    return response.data;
  } catch (error) {
    console.error("Resource Update Error:", error.response?.data);
    throw error.response?.data || { message: "Failed to update resource" };
  }
};

const remove = async (id) => {
  await api.delete(`/api/resources/${id}`);
  return { success: true };
};

export default {
  getAll,
  create,
  update,
  remove,
};