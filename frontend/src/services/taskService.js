import api from "./api";



// lấy tất cả task

export const getTasks = () => {

    return api.get("/tasks");

};




// tìm kiếm task

export const searchTasks = (keyword) => {

    return api.get(`/tasks/search?keyword=${keyword}`);

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

    return api.post("/tasks", data);

};




// cập nhật task

export const updateTask = (id, data) => {

    return api.put(`/tasks/${id}`, data);

};




// xóa task

export const deleteTask = (id) => {

    return api.delete(`/tasks/${id}`);

};




// hoàn thành task

export const completeTask = (id) => {

    return api.patch(`/tasks/${id}/complete`);

};