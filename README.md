# Quan-Ly-Cong-Viec

cd backend 
npm install
npm run start:dev

cd frontend
npm install
npm run dev
# Quản Lý Người Dùng :
# Authentication & User Management Module

## Giới thiệu

Đây là phần công việc cá nhân trong Project **Hệ thống Quản lý Công việc**, được xây dựng bằng **NestJS**, **TypeORM**, **MySQL** và **JWT Authentication**.

## Công nghệ sử dụng

- NestJS
- TypeScript
- TypeORM
- MySQL (Aiven)
- JWT Authentication
- Passport JWT
- Bcrypt
- ReactJS
- React Bootstrap

---

# Nhiệm vụ cá nhân

## Backend

- Xây dựng bảng `users`
- Đăng ký tài khoản
- Đăng nhập
- JWT Authentication
- Cập nhật thông tin cá nhân
- Quên mật khẩu
- Đặt lại mật khẩu

## Frontend

- Trang Đăng ký
- Trang Đăng nhập
- Trang Hồ sơ cá nhân

## Database

Bảng `users`

| Trường | Kiểu dữ liệu |
|---------|--------------|
| id | int |
| fullName | varchar |
| email | varchar |
| password | varchar |
| avatar | varchar |
| createdAt | datetime |
| updatedAt | datetime |

---

# Cấu trúc Module

```
src
│
├── auth
│   ├── auth.controller.ts
│   ├── auth.service.ts
│   ├── auth.module.ts
│   ├── jwt.strategy.ts
│   ├── jwt-auth.guard.ts
│   ├── get-user.decorator.ts
│   └── dto
│
├── users
│   ├── users.controller.ts
│   ├── users.service.ts
│   ├── users.module.ts
│   └── user.entity.ts
```

---

# API

## Đăng ký

```
POST /auth/register
```

Request

```json
{
  "fullName": "Nguyễn Văn A",
  "email": "a@gmail.com",
  "password": "123456"
}
```

---

## Đăng nhập

```
POST /auth/login
```

Request

```json
{
  "email":"a@gmail.com",
  "password":"123456"
}
```

Response

```json
{
  "access_token":"JWT_TOKEN"
}
```

---

## Lấy thông tin cá nhân

```
GET /users/profile
```

Header

```
Authorization: Bearer JWT_TOKEN
```

---

## Cập nhật thông tin

```
PUT /users/profile
```

---

# JWT Authentication

Sau khi đăng nhập thành công:

```
User
    │
    ▼
Login
    │
    ▼
AuthService
    │
    ▼
JwtService
    │
    ▼
Access Token
    │
    ▼
Frontend
    │
    ▼
Bearer Token
    │
    ▼
JwtAuthGuard
    │
    ▼
JwtStrategy
    │
    ▼
Protected API
```

---

# ORM

Dự án sử dụng **TypeORM** để kết nối MySQL.

Entity:

```
User
```

Repository:

```
Repository<User>
```

Các thao tác:

- Create
- Read
- Update

---

# Kiểm thử

Đã kiểm thử các chức năng:

- Đăng ký
- Đăng nhập
- JWT Authentication
- Profile
- Update Profile

Công cụ:

- Postman
- MySQL Workbench

---

# UML

Đã xây dựng:

- Class Diagram
- ERD
- Use Case Authentication
- Activity Register
- Activity Login
- Sequence Register
- Sequence Login
- Sequence JWT Authentication
- Sequence Update Profile
- Sequence Change Password
- Sequence Forgot Password
- Component Diagram
- Package Diagram

---

# Thành viên thực hiện

**Vu Do Huu**

Phụ trách:

- Authentication
- User Management
- JWT Authentication
- Users Table
- Login
- Register
- Profile
- Frontend Authentication
- Backend Authentication

---

# Kết quả đạt được

- Hoàn thành chức năng Authentication.
- Hoàn thành quản lý người dùng.
- Tích hợp JWT Authentication.
- Kết nối MySQL bằng TypeORM.
- Xây dựng giao diện React.
- Hoàn thành kiểm thử các chức năng chính.
