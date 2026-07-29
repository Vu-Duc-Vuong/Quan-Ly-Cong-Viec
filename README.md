📋 Quản Lý Công Việc (Task Manager)

Ứng dụng quản lý công việc cá nhân full-stack, cho phép người dùng đăng ký/đăng nhập, tạo và theo dõi công việc (task) theo trạng thái, độ ưu tiên, danh mục và hạn hoàn thành, kèm thống kê tổng quan.

Đây là bài tập lớn nhóm, xây dựng theo mô hình tách biệt Backend (NestJS + TypeORM + MySQL) và Frontend (ReactJS + Vite).

📑 Mục lục
Tính năng chính
Kiến trúc & Công nghệ
Cấu trúc thư mục
Sơ đồ cơ sở dữ liệu
Danh sách API
Hướng dẫn cài đặt & chạy dự án
Biến môi trường (.env)
Kiểm thử
Ghi chú kỹ thuật / hạn chế hiện tại
Thành viên nhóm
✨ Tính năng chính
Xác thực & Người dùng
Đăng ký tài khoản (họ tên, email, mật khẩu)
Đăng nhập bằng email/mật khẩu, trả về JWT access_token
Xác thực API bằng JWT (Passport JWT Strategy + JwtAuthGuard)
Xem/cập nhật hồ sơ cá nhân (họ tên, avatar)
Quên mật khẩu: gửi email chứa link đặt lại mật khẩu (Nodemailer)
Đặt lại mật khẩu bằng token gửi qua email
Quản lý công việc (Task)
Tạo / xem danh sách / xem chi tiết / cập nhật / xoá task (CRUD đầy đủ)
Mỗi task có: tiêu đề, mô tả, trạng thái (, , ), độ ưu tiên (, , ), hạn hoàn thành (deadline), danh mục (category)TODODOINGDONELOWMEDIUMHIGH
Cập nhật riêng trạng thái / độ ưu tiên / đánh dấu hoàn thành nhanh
Tìm kiếm task theo từ khoá (tiêu đề/mô tả)
Lọc task theo hạn hôm nay () và quá hạn (todayoverdue)
Task luôn gắn với người dùng sở hữu (mỗi user chỉ thao tác được task của chính mình)
Danh mục & Thống kê (Category & Statistics)
CRUD danh mục (category) công việc
Gán / gỡ danh mục cho task
Tìm kiếm & lọc task theo từ khoá, danh mục, trạng thái
Thống kê tổng quan số lượng công việc (tổng số, hoàn thành, quá hạn, sắp đến hạn...)
Giao diện người dùng (Frontend)
Trang Đăng nhập / Đăng ký / Quên mật khẩu / Đặt lại mật khẩu
Layout chính có Header + Sidebar điều hướng (Dashboard, Tasks, Categories, Calendar, Statistics, Profile)
Dashboard tổng quan công việc
Trang quản lý công việc (danh sách, thẻ task - TaskCard)
Trang Danh mục, trang Lịch (Calendar), trang Thống kê
Trang Hồ sơ cá nhân
Định tuyến bảo vệ () — chỉ người dùng đã đăng nhập mới truy cập được các trang nội bộProtectedRoute
🛠 Kiến trúc & Công nghệ

Backend

Thành phần	Công nghệ
Khung	NestJS 11 (kiến trúc phân lớp: Controller – Service – Module – Entity)
Ngôn ngữ	TypeScript
ORM	TypeORM (@nestjs/typeorm)
Cơ sở dữ liệu	MySQL (đang cấu hình dùng Aiven Cloud MySQL, kết nối SSL)
Xác thực	JWT () + Hộ chiếu (@nestjs/jwtpassport-jwt)
Mã hoá mật khẩu	bcrypt
Gửi email	@nestjs-modules/mailer + Nodemailer
Validate dữ liệu	class-validator / class-transformer (đã cài đặt sẵn)
Kiểm thử	Is (kiểm thử đơn vị), supertest (e2e)

Giao diện người dùng

Thành phần	Công nghệ
Khung	ReactJS 19
Công cụ xây dựng	Nhanh lên
Định tuyến	React Router DOM v7
Giao diện	React Bootstrap + Bootstrap 5
Biểu tượng	Lucide-React, React-Bootstrap-Icons
Gọi API	Axios
📂 Cấu trúc thư mục
Quan-Ly-Cong-Viec-main/
├── backend/                        # NestJS API
│   ├── images/                     # Ảnh tĩnh (avatar...) phục vụ qua /images
│   ├── src/
│   │   ├── app.module.ts           # Module gốc, khai báo kết nối DB & import các module
│   │   ├── main.ts                 # Bootstrap ứng dụng, cấu hình CORS, static files
│   │   ├── auth/                   # Đăng ký / đăng nhập / JWT / quên-đặt lại mật khẩu
│   │   │   ├── auth.controller.ts
│   │   │   ├── auth.service.ts
│   │   │   ├── jwt.strategy.ts
│   │   │   ├── jwt-auth.guard.ts
│   │   │   ├── get-user.decorator.ts
│   │   │   └── dto/
│   │   ├── users/                  # Quản lý người dùng (entity, service, controller)
│   │   ├── mail/                   # Gửi email (quên mật khẩu)
│   │   ├── tasks/                  # CRUD Task, tìm kiếm, lọc, cập nhật trạng thái/ưu tiên
│   │   │   ├── entities/task.entity.ts
│   │   │   ├── tasks.controller.ts
│   │   │   ├── tasks.service.ts
│   │   │   └── dto/
│   │   ├── member3/                # Module Category & Thống kê & Tìm kiếm nâng cao
│   │   │   ├── entities/           # Category, TaskCategory
│   │   │   ├── categories/         # CRUD danh mục, gán/gỡ task
│   │   │   ├── statistics/         # API thống kê tổng hợp
│   │   │   ├── task-query/         # API tìm kiếm/lọc task nâng cao
│   │   │   └── dto/
│   │   └── project/                # ⚠️ Bản nháp/prototype (mock data, CHƯA được import
│   │                                #    vào app.module.ts — xem mục "Ghi chú kỹ thuật")
│   └── test/                       # Cấu hình e2e test (jest-e2e.json, app.e2e-spec.ts)
│
└── frontend/                       # ReactJS SPA
    └── src/
        ├── main.jsx / App.jsx      # Điểm khởi chạy ứng dụng
        ├── routes/AppRoutes.jsx    # Khai báo toàn bộ route của ứng dụng
        ├── layouts/MainLayout.jsx  # Layout chung (Header + Sidebar + nội dung)
        ├── components/            # Header, Sidebar, TaskCard, ProtectedRoute
        ├── pages/                 # Dashboard, Tasks, Calendar, Statistics, Profile,
        │                          # Login, Register, ForgotPassword, ResetPassword
        ├── member3/                # Trang & component Category/Statistics (nhóm thành viên 3)
        ├── project/                # ⚠️ Component nháp (CategoryManager, StatisticsSummary,
        │                          #    TaskSearchFilter) — chưa được gắn vào route nào
        └── services/              # api.js (axios instance), authService.js, taskService.js
🗄 Sơ đồ cơ sở dữ liệu

Dự án dùng TypeORM với (tự động đồng bộ schema từ entity trong môi trường phát triển).synchronize: true

Bảng users

Trường	Kiểu	Ghi chú
id	int (PK, tự động)	
Tên đầy đủ	varchar	
email	varchar	độc nhất
mật khẩu	varchar	đã băm bằng bcrypt
avatar	varchar	có thể làm hư không
createdAt / updatedAt	thời gian ngày	

Bảng tasks

Trường	Kiểu	Ghi chú
id	int (PK, tự động)	
tiêu đề	varchar	
Mô tả	varchar	có thể làm hư không
tình trạng	enum(,,TODODOINGDONE)	mặc định TODO
ưu tiên	enum(,,LOWMEDIUMHIGH)	mặc định MEDIUM
hạn chót	thời gian ngày	có thể làm hư không
userId	FK → users.id	tỷ lệ nhiều ăn một
categoryId	FK → categories.id	có thể null, ON DELETE SET NULL
createdAt / updatedAt	thời gian ngày	

Bảng categories

Trường	Kiểu	Ghi chú
id	int (PK, tự động)	
tên gọi	varchar	
Mô tả	varchar(500)	có thể làm hư không
userId	int	chủ sở hữu danh mục
createdAt / updatedAt	thời gian ngày	

Bảng task_categories (bảng phụ, hiện tồn tại song song với quan hệ trực tiếp trong categoryIdtasks)

Trường	Kiểu	Ghi chú
id	int (PK, tự động)	
taskId	int	
categoryId	int	
được tạo tại	thời gian ngày	Unique theo cặp (taskId, categoryId)

Số lượng: 1 người dùng – N nhiệm vụ · 1 người dùng – N danh mục · 1 Danh mục – N nhiệm vụ

🔌 Danh sách API

Base URL mặc định: http://localhost:3000

Xác thực (/auth)
Phương pháp	Điểm cuối	Mô tả	Cần JWT
BƯU TIÊN	/auth/register	Đăng ký tài khoản	Không
BƯU TIÊN	/auth/login	Đăng nhập, trả về access_token	Không
BƯU TIÊN	/auth/forgot-password	Gửi email đặt lại mật khẩu	Không
BƯU TIÊN	/auth/reset-password	Đặt lại mật khẩu bằng token	Không
LẤY	/auth/profile	Lấy thông tin hồ sơ	Có
Người dùng (/users)
Phương pháp	Điểm cuối	Mô tả	Cần JWT
LẤY	/users/profile	Xem thông tin cá nhân	Có
PUT/PATCH	/users/profile	Cập nhật thông tin cá nhân	Có
Nhiệm vụ (/tasks)
Phương pháp	Điểm cuối	Mô tả	Cần JWT
LẤY	/tasks	Danh sách task của user hiện tại	Có
LẤY	/tasks/search?keyword=	Tìm kiếm task theo từ khoá	Có
LẤY	/tasks/today	Task có hạn hôm nay	Không*
LẤY	/tasks/overdue	Task quá hạn	Không*
LẤY	/tasks/:id	Chi tiết 1 task	Có
BƯU TIÊN	/tasks	Tạo task mới	Có
ĐẶT	/tasks/:id	Cập nhật task	Có
XÓA	/tasks/:id	Xoá task	Có
MIẾNG VÁ	/tasks/:id/status	Cập nhật trạng thái	Có
MIẾNG VÁ	/tasks/:id/priority	Cập nhật độ ưu tiên	Có
MIẾNG VÁ	/tasks/:id/complete	Đánh dấu hoàn thành	Có

* Hai endpoint và hiện chưa gắn JwtAuthGuard và truy vấn toàn bộ bảng task (không lọc theo user) — xem phần Ghi chú kỹ thuật.todayoverdue

Categories & Thống kê (/member3/...)
Phương pháp	Điểm cuối	Mô tả	Cần JWT
LẤY	/member3/categories	Danh sách danh mục của user	Có
BƯU TIÊN	/member3/categories	Tạo danh mục	Có
MIẾNG VÁ	/member3/categories/:id	Cập nhật danh mục	Có
XÓA	/member3/categories/:id	Xoá danh mục	Có
BƯU TIÊN	/member3/categories/assign-task	Gán danh mục cho task	Có
XÓA	/member3/categories/task/:taskId	Gỡ danh mục khỏi task	Có
LẤY	/member3/tasks/query?keyword=&categoryId=&status=	Tìm kiếm/lọc task nâng cao	Có
LẤY	/member3/statistics/summary	Thống kê tổng hợp task	Có
🚀 Hướng dẫn cài đặt & chạy dự án
Yêu cầu
Node.js ≥ 18
MySQL Server (hoặc dịch vụ MySQL cloud, ví dụ Aiven — dự án đang cấu hình kết nối SSL)
npm
1. Clone dự án
đập
git clone <repo-url>
cd Quan-Ly-Cong-Viec-main
2. Chạy Backend
đập
cd backend
npm install

Tạo file trong thư mục (xem mục Biến môi trường bên dưới), sau đó:.envbackend

đập
npm run start:dev

Mặc định API chạy tại .http://localhost:3000

3. Chạy Frontend
đập
cd frontend
npm install
npm run dev

Mặc định giao diện chạy tại (Vite).http://localhost:5173

🔐 Biến môi trường (.env)

File trong cần các biến sau:.envbackend/

môi trường
# Database
DB_HOST=your-mysql-host
DB_PORT=3306
DB_USERNAME=your-username
DB_PASSWORD=your-password
DB_DATABASE=your-database
DB_SSL_CA=./ca.pem          # đường dẫn tới chứng chỉ SSL CA (bắt buộc vì code dùng ssl.ca)

# Mail (dùng cho quên/đặt lại mật khẩu)
MAIL_HOST=smtp.example.com
MAIL_PORT=587
MAIL_USER=your-email@example.com
MAIL_PASS=your-email-app-password

# Frontend URL (dùng để tạo link đặt lại mật khẩu trong email)
FRONTEND_URL=http://localhost:5173

⚠️ Lưu ý: Trong code hiện tại, / bắt buộc đọc file chứng chỉ SSL () khi khởi tạo kết nối TypeORM. Nếu MySQL của bạn không dùng SSL, cần chỉnh sửa (bỏ hoặc điều kiện hoá phần ) để chạy được với MySQL cục bộ (XAMPP/local).main.tsapp.module.tsfs.readFileSync(process.env.DB_SSL_CA || './ca.pem')app.module.tsssl

⚠️ JWT secret () và cổng server (, hard-code trong ) hiện đang được hard-code trực tiếp trong code thay vì đọc từ — nên đưa vào biến môi trường (, ) để đảm bảo an toàn khi triển khai thực tế."task-manager-secret"3000main.ts.envJWT_SECRETPORT

🧪 Kiểm thử

Backend dùng Jest, chạy tại thư mục :backend/

đập
npm run test         # unit test (các file *.spec.ts)
npm run test:cov     # unit test kèm coverage
npm run test:e2e     # end-to-end test (thư mục /test)

Các file test hiện có:

src/app.controller.spec.ts
src/auth/auth.controller.spec.ts, src/auth/auth.service.spec.ts
src/users/users.controller.spec.ts, src/users/users.service.spec.ts
test/app.e2e-spec.ts
