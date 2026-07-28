import api from "./api";

const layHeader = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});

// lấy tất cả task

export const getTasks = () => {
  return api.get("/tasks", layHeader());
};




// tìm kiếm task

export const searchTasks = (keyword) => {
  return api.get(`/tasks/search?keyword=${keyword}`, layHeader());
};



// task hôm nay

export const getTodayTasks = () => {

    return api.get("/tasks/today");

};




// task quá hạn

export const getOverdueTasks = () => {

    return api.get("/tasks/overdue");

};




// thêm task

export const createTask = (data) => {
  return api.post("/tasks", data, layHeader());
};




// cập nhật task

export const updateTask = (id, data) => {
  return api.put(`/tasks/${id}`, data, layHeader());
};




// xóa task

export const deleteTask = (id) => {
  return api.delete(`/tasks/${id}`, layHeader());
};




// hoàn thành task

export const completeTask = (id) => {
  return api.patch(`/tasks/${id}/complete`, {}, layHeader());
};