Dự án Xây dựng Ứng dụng Quản lý Công việc (Task Management Application) hỗ trợ người dùng tạo, theo dõi, phân loại và quản lý tiến độ công việc hiệu quả theo mô hình Client-Server hiện đại.

---

## 🛠 1. Công nghệ sử dụng (Tech Stack)

### **Backend**
- **Framework:** NestJS (TypeScript) - Mô hình kiến trúc phân lớp (Controller - Service - Repository/Entity).
- **ORM & Database:** TypeORM kết hợp với MySQL / PostgreSQL.
- **Authentication & Security:** JWT (JSON Web Token), Passport-JWT, Bcrypt (Mã hóa mật khẩu).
- **Mailing:** `@nestjs-modules/mailer`, Nodemailer (Gửi email khôi phục mật khẩu).
- **Testing:** Jest (Unit Test), Supertest (E2E Test).

### **Frontend**
- **Framework:** React.js (Vite, JSX).
- **Routing:** React Router DOM (v6+).
- **HTTP Client:** Axios (cấu hình Interceptors tự động đính kèm Token).
- **UI & Styling:** Custom CSS3, Responsive Design, React Icons.

---

## 📁 2. Cấu trúc thư mục dự án

Quan-Ly-Cong-Viec-main/
├── backend/                  # Mã nguồn Server (NestJS)
│   ├── src/
│   │   ├── auth/            # Module Xác thực (Login, Register, Reset Pass)
│   │   ├── users/           # Module Quản lý Người dùng & Profile
│   │   ├── tasks/           # Module Quản lý Công việc (CRUD, Trạng thái, Độ ưu tiên)
│   │   ├── mail/            # Module Gửi Email
│   │   ├── member3/         # Module Chức năng mở rộng (Danh mục, Thống kê riêng)
│   │   ├── project/         # Module Quản lý Dự án & Danh mục dự án
│   │   ├── app.module.ts    # Module gốc của ứng dụng
│   │   └── main.ts          # Entry point của Backend
│   ├── test/                # Unit Test & E2E Test
│   └── .env                 # Cấu hình biến môi trường Backend
│
└── frontend/                 # Mã nguồn Client (ReactJS + Vite)
├── src/
│   ├── assets/          # Hình ảnh, file CSS tĩnh
│   ├── components/      # Component dùng chung (Header, Sidebar, TaskCard, ProtectedRoute)
│   ├── layouts/         # Khung giao diện chính (MainLayout)
│   ├── pages/           # Các trang chính (Dashboard, Tasks, Categories, Statistics, Calendar, Profile, Auth)
│   ├── routes/          # Cấu hình đường dẫn (AppRoutes)
│   ├── services/        # Gọi API tích hợp (api.js, authService.js, taskService.js)
│   └── member3/         # Component & Pages phân quyền/chức năng riêng
└── .env                 # Cấu hình URL API Backend

## 🚀 3. Hướng dẫn Cài đặt & Khởi chạy

### **Bước 1: Cấu hình Môi trường (.env)**

1. **Backend (`backend/.env`):**
```env
PORT=3000
DB_HOST=localhost
DB_PORT=3306
DB_USERNAME=root
DB_PASSWORD=your_password
DB_DATABASE=task_management
JWT_SECRET=super_secret_jwt_key
MAIL_HOST=smtp.gmail.com
MAIL_USER=your_email@gmail.com
MAIL_PASS=your_app_password
Frontend (frontend/.env):Đoạn mãVITE_API_URL=http://localhost:3000
Bước 2: Cài đặt và Chạy BackendBashcd backend
npm install
npm run start:dev
Server sẽ chạy tại: http://localhost:3000Bước 3: Cài đặt và Chạy FrontendBashcd frontend
npm install
npm run dev
Ứng dụng Frontend sẽ chạy tại: http://localhost:5173🧪
4. Kiểm thử (Testing)Chạy các kịch bản kiểm thử Unit Test trong Backend:Bashcd backend
npm run test          # Chạy Unit Tests
npm run test:e2e      # Chạy End-to-End Tests
👨‍💻 5. Tính năng chính:
🔒 Đăng ký / Đăng nhập / Đổi mật khẩu / Quên mật khẩu (qua Email Token).
📋 Quản lý Công việc (Tasks): Thêm, sửa, xóa, tìm kiếm, lọc theo trạng thái/độ ưu tiên.
🏷️ Quản lý Danh mục (Categories): Gán công việc theo từng danh mục công việc.
📊 Thống kê & Báo cáo: Biểu đồ/thống kê tiến độ công việc hoàn thành.
📅 Lịch biểu (Calendar View): Theo dõi deadline trực quan.
