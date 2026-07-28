import { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { resetPassword } from "../services/authService";

function ResetPassword() {

  const [searchParams] = useSearchParams();

  const navigate = useNavigate();

  const token = searchParams.get("token");

  const [password, setPassword] = useState("");

  const doiMatKhau = async () => {

    if (password.length < 6) {

      alert("Mật khẩu phải từ 6 ký tự");

      return;

    }

    try {

      await resetPassword({

  token,

  newPassword: password,

});

      alert("Đổi mật khẩu thành công");

      navigate("/login");

    } catch {

      alert("Link không hợp lệ hoặc đã hết hạn");

    }

  };

  return (

    <div className="container mt-5" style={{ maxWidth: 500 }}>

      <h2>Đặt lại mật khẩu</h2>

      <input
        className="form-control"
        type="password"
        placeholder="Mật khẩu mới"
        value={password}
        onChange={(e) =>
          setPassword(e.target.value)
        }
      />

      <br />

      <button
        className="btn btn-primary w-100"
        onClick={doiMatKhau}
      >
        Đổi mật khẩu
      </button>

    </div>

  );

}

export default ResetPassword;