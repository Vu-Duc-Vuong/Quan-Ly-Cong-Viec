import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
    getProfile,
    updateProfile,
    changePassword,
} from "../services/authService";


function Profile() {


    const navigate = useNavigate();

    const token = localStorage.getItem("token");


    const [user,setUser] = useState({

        fullName:"",
        email:"",
        avatar:"",

    });



    const [loading,setLoading] = useState(false);


    const [oldPassword,setOldPassword] = useState("");

    const [newPassword,setNewPassword] = useState("");

    const [confirmPassword,setConfirmPassword] = useState("");





    useEffect(()=>{


        const layThongTin = async()=>{


            try{


                const res = await getProfile(token);


                setUser({

                    fullName:res.data.fullName || "",

                    email:res.data.email || "",

                    avatar:res.data.avatar || "",


                });


            }
            catch(error){


                alert("Không lấy được thông tin");


            }


        };


        layThongTin();


    },[]);









    const getAvatar = ()=>{


        if(!user.avatar){

            return "http://localhost:3000/images/avatar.png";

        }



        if(user.avatar.startsWith("http")){

            return user.avatar;

        }



        return `http://localhost:3000/images/${user.avatar}`;


    };









    const capNhat = async()=>{


        setLoading(true);


        try{


            await updateProfile(token,user);


            localStorage.setItem(

                "user",

                JSON.stringify(user)

            );


            alert("Cập nhật thành công");


        }
        catch(error){


            alert("Cập nhật thất bại");


        }


        setLoading(false);


    };









    const doiMatKhau = async()=>{


        if(!oldPassword || !newPassword || !confirmPassword){


            alert("Vui lòng nhập đầy đủ thông tin");

            return;


        }




        if(newPassword !== confirmPassword){


            alert("Mật khẩu xác nhận không khớp");

            return;


        }




        if(newPassword.length < 6){


            alert("Mật khẩu mới phải có ít nhất 6 ký tự");

            return;


        }





        try{


            await changePassword(token,{

                oldPassword,

                newPassword,

            });



            alert(

                "Đổi mật khẩu thành công. Vui lòng đăng nhập lại."

            );



            localStorage.removeItem("token");

            localStorage.removeItem("user");


            navigate("/login");


        }
        catch(error){


            alert(

                error.response?.data?.message ||

                "Đổi mật khẩu thất bại"

            );


        }


    };









    return (


        <div className="container mt-5">


            <div

                className="card shadow mx-auto p-4"

                style={{maxWidth:"550px"}}

            >



                <h2 className="text-center mb-4">

                    Hồ sơ cá nhân

                </h2>





                <div className="text-center mb-4">


                    <img

                        src={getAvatar()}

                        alt="Avatar"

                        width="140"

                        height="140"

                        className="rounded-circle border"

                        style={{

                            objectFit:"cover"

                        }}

                    />


                </div>








                <div className="mb-3">


                    <label className="form-label">

                        Họ và tên

                    </label>


                    <input

                        className="form-control"

                        value={user.fullName}

                        onChange={(e)=>

                            setUser({

                                ...user,

                                fullName:e.target.value

                            })

                        }

                    />


                </div>








                <div className="mb-3">


                    <label className="form-label">

                        Email

                    </label>


                    <input

                        className="form-control"

                        value={user.email}

                        onChange={(e)=>

                            setUser({

                                ...user,

                                email:e.target.value

                            })

                        }

                    />


                </div>








                <div className="mb-4">


                    <label className="form-label">

                        Link Avatar

                    </label>


                    <input

                        className="form-control"

                        value={user.avatar}

                        onChange={(e)=>

                            setUser({

                                ...user,

                                avatar:e.target.value

                            })

                        }

                    />


                </div>








                <button

                    className="btn btn-primary w-100 mb-3"

                    onClick={capNhat}

                    disabled={loading}

                >

                    {

                        loading

                        ?

                        "Đang cập nhật..."

                        :

                        "Cập nhật"

                    }


                </button>








                <hr />








                <h4 className="mb-3">

                    Đổi mật khẩu

                </h4>








                <div className="mb-3">


                    <label className="form-label">

                        Mật khẩu hiện tại

                    </label>


                    <input

                        className="form-control"

                        type="password"

                        value={oldPassword}

                        onChange={(e)=>

                            setOldPassword(e.target.value)

                        }

                    />


                </div>








                <div className="mb-3">


                    <label className="form-label">

                        Mật khẩu mới

                    </label>


                    <input

                        className="form-control"

                        type="password"

                        value={newPassword}

                        onChange={(e)=>

                            setNewPassword(e.target.value)

                        }

                    />


                </div>








                <div className="mb-4">


                    <label className="form-label">

                        Xác nhận mật khẩu mới

                    </label>


                    <input

                        className="form-control"

                        type="password"

                        value={confirmPassword}

                        onChange={(e)=>

                            setConfirmPassword(e.target.value)

                        }

                    />


                </div>








                <button

                    className="btn btn-warning w-100"

                    onClick={doiMatKhau}

                >

                    Đổi mật khẩu

                </button>



            </div>


        </div>


    );


}


export default Profile;