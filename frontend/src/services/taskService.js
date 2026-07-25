import api from "./api";



// lấy tất cả task

export const getTasks = () => {

    return api.get("/tasks");

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