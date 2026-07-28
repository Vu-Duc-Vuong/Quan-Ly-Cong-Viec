import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { login } from "../services/authService";

function Login() {

  const navigate = useNavigate();

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);

  const dangNhap = async () => {

    if (!email || !password) {

      alert("Vui lòng nhập đầy đủ thông tin");

      return;

    }

    if (!email.includes("@")) {

      alert("Email không hợp lệ");

      return;

    }

    setLoading(true);

    try {

      const res = await login({
        email,
        password,
      });

      localStorage.setItem(
        "token",
        res.data.access_token
      );

      localStorage.setItem(
        "user",
        JSON.stringify(res.data.user)
      );

      alert("Đăng nhập thành công");

      setLoading(false);

      navigate("/");

    } catch (error) {

      setLoading(false);

      console.log(error);

      console.log(error.response);

      console.log(error.response?.data);

      alert("Email hoặc mật khẩu không đúng");

    }

  };

  return (

    <div className="container d-flex justify-content-center align-items-center vh-100">

      <div
        className="card shadow p-4"
        style={{ width: "420px" }}
      >

        <h2 className="text-center mb-4">
          Đăng nhập
        </h2>

        <div className="mb-3">

          <label className="form-label">
            Email
          </label>

          <input
            className="form-control"
            type="email"
            placeholder="Nhập email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
            onChange={(e) => setPassword(e.target.value)}
          />

        </div>

        <button
          className="btn btn-primary w-100"
          onClick={dangNhap}
          disabled={loading}
        >
          {loading ? "Đang đăng nhập..." : "Đăng nhập"}
        </button>

        <div className="text-center mt-3">

          <Link to="/forgot-password">
            Quên mật khẩu?
          </Link>

        </div>

        <p className="text-center mt-3 mb-0">

          Chưa có tài khoản?{" "}

          <Link to="/register">
            Đăng ký
          </Link>

        </p>

      </div>

    </div>

  );

}

export default Login;