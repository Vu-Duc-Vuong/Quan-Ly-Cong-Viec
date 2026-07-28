import { useState } from "react";
import { Link } from "react-router-dom";
import { forgotPassword } from "../services/authService";

function ForgotPassword() {

  const [email, setEmail] = useState("");

  const [loading, setLoading] = useState(false);

  const guiEmail = async () => {

    if (!email) {

      alert("Vui lòng nhập email");

      return;

    }

    if (!email.includes("@")) {

      alert("Email không hợp lệ");

      return;

    }

    setLoading(true);

    try {

      const res = await forgotPassword({
        email,
      });

      alert(res.data.message);

    } catch {

      alert("Không thể gửi email");

    }

    setLoading(false);

  };

  return (

    <div
      className="container mt-5"
      style={{ maxWidth: "450px" }}
    >

      <h2 className="mb-4">
        Quên mật khẩu
      </h2>

      <input
        className="form-control"
        type="email"
        placeholder="Nhập email"
        value={email}
        onChange={(e) =>
          setEmail(e.target.value)
        }
      />

      <br />

      <button
        className="btn btn-primary w-100"
        onClick={guiEmail}
        disabled={loading}
      >
        {loading
          ? "Đang gửi..."
          : "Gửi email đặt lại mật khẩu"}
      </button>

      <br />
      <br />

      <Link to="/login">
        Quay lại đăng nhập
      </Link>

    </div>

  );

}

export default ForgotPassword;