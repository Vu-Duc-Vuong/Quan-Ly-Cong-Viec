import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { register } from "../services/authService";

function Register() {

  const navigate = useNavigate();

  const [fullName, setFullName] = useState("");

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);

  const dangKy = async () => {

    if (!fullName || !email || !password) {

      alert("Vui lòng nhập đầy đủ thông tin");

      return;

    }

    if (!email.includes("@")) {

      alert("Email không hợp lệ");

      return;

    }

    if (password.length < 6) {

      alert("Mật khẩu phải có ít nhất 6 ký tự");

      return;

    }

    setLoading(true);

    try {

      await register({
        fullName,
        email,
        password,
      });

      alert("Đăng ký thành công");

      setLoading(false);

      navigate("/login");

    } catch (error) {

      setLoading(false);

      alert(
        error.response?.data?.message ||
        "Đăng ký thất bại"
      );

    }

  };

  return (

    <div className="container d-flex justify-content-center align-items-center vh-100">

      <div
        className="card shadow p-4"
        style={{ width: "420px" }}
      >

        <h2 className="text-center mb-4">
          Đăng ký
        </h2>

        <div className="mb-3">

          <label className="form-label">
            Họ và tên
          </label>

          <input
            className="form-control"
            placeholder="Nhập họ và tên"
            value={fullName}
            onChange={(e) =>
              setFullName(e.target.value)
            }
          />

        </div>

        <div className="mb-3">

          <label className="form-label">
            Email
          </label>

          <input
            className="form-control"
            type="email"
            placeholder="Nhập email"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
          />

        </div>

        <div className="mb-3">

          <label className="form-label">
            Mật khẩu
          </label>

          <input
            className="form-control"
            type="password"
            placeholder="Nhập mật khẩu"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
          />

        </div>

        <button
          className="btn btn-success w-100"
          onClick={dangKy}
          disabled={loading}
        >
          {loading ? "Đang đăng ký..." : "Đăng ký"}
        </button>

        <p className="text-center mt-3 mb-0">

          Đã có tài khoản?{" "}

          <Link to="/login">
            Đăng nhập
          </Link>

        </p>

      </div>

    </div>

  );

}

export default Register;