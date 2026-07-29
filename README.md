# 📋 Quản Lý Công Việc (Task Manager)

Ứng dụng quản lý công việc cá nhân được xây dựng theo mô hình **Full Stack**, giúp người dùng quản lý công việc, danh mục và theo dõi tiến độ thực hiện thông qua Dashboard thống kê.

Dự án được phát triển theo mô hình tách biệt **Frontend** và **Backend**, sử dụng ReactJS, NestJS và MySQL.

---

# 🚀 Công nghệ sử dụng

## Frontend

* ReactJS 19
* Vite
* React Router DOM
* Axios
* Bootstrap 5
* React Bootstrap
* Lucide React

## Backend

* NestJS
* TypeORM
* MySQL
* JWT Authentication
* Passport
* Bcrypt
* Nodemailer
* Class Validator

## Database

* MySQL

---

# 📂 Cấu trúc dự án

```text
Quan-Ly-Cong-Viec
│
├── frontend
│   ├── src
│   ├── public
│   ├── package.json
│   └── ...
│
├── backend
│   ├── src
│   │   ├── auth
│   │   ├── users
│   │   ├── tasks
│   │   ├── member3
│   │   │    ├── categories
│   │   │    └── statistics
│   │   └── ...
│   ├── package.json
│   └── ...
│
└── README.md
```

---

# ✨ Chức năng chính

## 👤 Quản lý người dùng

* Đăng ký tài khoản
* Đăng nhập
* Xác thực JWT
* Cập nhật thông tin cá nhân
* Đổi mật khẩu
* Quên mật khẩu qua Email

---

## ✅ Quản lý công việc

* Thêm công việc
* Sửa công việc
* Xóa công việc
* Xem danh sách công việc
* Xem chi tiết công việc
* Đánh dấu hoàn thành
* Thay đổi trạng thái
* Thay đổi mức ưu tiên
* Thiết lập Deadline
* Tìm kiếm công việc

---

## 📁 Quản lý danh mục

* Thêm danh mục
* Sửa danh mục
* Xóa danh mục
* Danh sách danh mục
* Gán danh mục cho công việc

---

## 📊 Dashboard & Thống kê

Hiển thị:

* Tổng số công việc
* Công việc hoàn thành
* Công việc đang thực hiện
* Công việc chưa thực hiện
* Công việc quá hạn
* Thống kê theo trạng thái
* Thống kê theo danh mục
* Thống kê theo mức ưu tiên

---

# 🗄️ Cơ sở dữ liệu

Các bảng chính

* users
* tasks
* categories
* task_categories

Quan hệ

```text
User
  │
  ├────< Task

Category
  │
  ├────< TaskCategory >──── Task
```

---

# 🔐 Authentication

Sử dụng

* JWT
* Passport JWT Strategy

Sau khi đăng nhập thành công

```text
Authorization: Bearer <access_token>
```

---

# ⚙️ Cài đặt dự án

## 1. Clone project

```bash
git clone <repository-url>
```

---

## 2. Backend

Di chuyển vào thư mục

```bash
cd backend
```

Cài đặt

```bash
npm install
```

Chạy

```bash
npm run start:dev
```

---

## 3. Frontend

Di chuyển

```bash
cd frontend
```

Cài đặt

```bash
npm install
```

Chạy

```bash
npm run dev
```

---

# ⚙️ Biến môi trường

Ví dụ file `.env`

```env
DB_HOST=localhost
DB_PORT=3306
DB_USERNAME=root
DB_PASSWORD=your_password
DB_DATABASE=task_manager

JWT_SECRET=your_secret_key

MAIL_HOST=smtp.gmail.com
MAIL_PORT=587
MAIL_USER=example@gmail.com
MAIL_PASSWORD=your_password
```

---

# 📌 API chính

## Authentication

* POST /auth/register
* POST /auth/login
* POST /auth/forgot-password
* POST /auth/reset-password

---

## Users

* GET /users/profile
* PATCH /users/profile

---

## Tasks

* GET /tasks
* GET /tasks/:id
* POST /tasks
* PATCH /tasks/:id
* DELETE /tasks/:id

---

## Categories

* GET /categories
* POST /categories
* PATCH /categories/:id
* DELETE /categories/:id

---

## Statistics

* GET /statistics/dashboard
* GET /statistics/category
* GET /statistics/status

---

# 🧪 Kiểm thử

Backend

```bash
npm test
```

Frontend

```bash
npm run lint
```

---

# 👥 Phân công thành viên

## Thành viên 1

* Đăng ký
* Đăng nhập
* JWT Authentication
* Hồ sơ người dùng
* Quên mật khẩu

---

## Thành viên 2

* CRUD Công việc
* Deadline
* Trạng thái
* Độ ưu tiên
* Tìm kiếm

---

## Thành viên 3

* CRUD Danh mục
* Dashboard
* Thống kê
* Biểu đồ
* Báo cáo

---

# 📸 Giao diện

Có thể bổ sung các ảnh chụp màn hình sau:

* Trang đăng nhập
* Trang đăng ký
* Dashboard
* Danh sách công việc
* Trang danh mục
* Hồ sơ cá nhân

---

# 📄 Giấy phép

Dự án được xây dựng phục vụ mục đích học tập và nghiên cứu.

---

# ❤️ Lời cảm ơn

Xin cảm ơn giảng viên và các thành viên trong nhóm đã hỗ trợ hoàn thành dự án **Quản Lý Công Việc**.
