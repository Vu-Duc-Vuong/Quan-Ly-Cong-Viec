import api from '../../services/api';

const authConfig = () => ({
  headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
});

export const getMember3Categories = () => api.get('/member3/categories', authConfig());
export const createMember3Category = (data) => api.post('/member3/categories', data, authConfig());
export const updateMember3Category = (id, data) => api.patch(`/member3/categories/${id}`, data, authConfig());
export const deleteMember3Category = (id) => api.delete(`/member3/categories/${id}`, authConfig());
export const assignMember3Category = (taskId, categoryId) =>
  api.post('/member3/categories/assign-task', { taskId, categoryId: Number(categoryId) }, authConfig());
export const getMember3Statistics = () => api.get('/member3/statistics/summary', authConfig());
export const queryMember3Tasks = ({ keyword = '', categoryId = '', status = '' }) =>
  api.get('/member3/tasks/query', {
    ...authConfig(),
    params: { keyword, categoryId, status },
  });
