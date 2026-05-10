import api from './api';

const getAll = async () => {
  const response = await api.get('/api/tasks');
  return response.data;
};

const create = async (data) => {
  const response = await api.post('/api/tasks', data);
  return response.data;
};

const update = async (id, data) => {
  const response = await api.put(`/api/tasks/${id}`, data);
  return response.data;
};

const remove = async (id) => {
  await api.delete(`/api/tasks/${id}`);
  return { success: true };
};

const updateStatus = async (id, status) => {
  const response = await api.patch(`/api/tasks/${id}/status`, { status });
  return response.data;
};

export default {
  getAll,
  create,
  update,
  remove,
  updateStatus,
};