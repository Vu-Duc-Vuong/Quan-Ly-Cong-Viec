import { useMemo, useState } from "react";

import {
    Navbar,
    Container,
    Nav,
    NavDropdown,
    Form
} from "react-bootstrap";


import {
    Link,
    useNavigate
} from "react-router-dom";


import {
    Bell
} from "lucide-react";


import "../assets/header.css";


const menuItems = [
    {
        name:"Trang chủ",
        path:"/"
    },
    {
        name:"Công việc",
        path:"/tasks"
    },
    {
        name:"Thống kê",
        path:"/statistics"
    },
    {
        name:"Danh mục",
        path:"/categories"
    },
    {
        name:"Lịch làm việc",
        path:"/calendar"
    },
    {
        name:"Hồ sơ",
        path:"/profile"
    }
];



function Header() {


    const [user,setUser] = useState(()=>{

        const userData = localStorage.getItem("user");

        return userData ? JSON.parse(userData) : null;

    });

    const [keyword,setKeyword] = useState("");

    const navigate = useNavigate();


    const handleLogout=()=>{


        localStorage.removeItem("user");

        localStorage.removeItem("token");


        setUser(null);


        navigate("/login");

    };

    const result = useMemo(()=>{


        if(!keyword.trim()){

            return [];

        }



        return menuItems.filter(item=>

            item.name
            .toLowerCase()
            .includes(keyword.toLowerCase())

        );


    },[keyword]);











    const handleGo=(item)=>{


        navigate(item.path);

        setKeyword("");


    };









    const handleEnter=(e)=>{


        if(

            e.key==="Enter"

            &&

            result.length>0

        ){

            handleGo(result[0]);

        }


    };











    return (


        <Navbar className="header-navbar">


            <Container fluid>



                {/* TAGLINE ONLY */}


                <Navbar.Brand className="brand-area">


                    <div className="header-tagline">

                        Hệ thống Quản lý công việc

                    </div>


                </Navbar.Brand>









                {/* RIGHT AREA */}


                <div className="header-right">





                    {/* SEARCH */}


                    <div className="header-search">


                        <Form.Control


                            value={keyword}


                            onChange={e=>setKeyword(e.target.value)}


                            onKeyDown={handleEnter}


                            placeholder="Tìm kiếm chức năng..."


                        />



                        <img

                            src="/images/kinhlup.png"


                            alt="search"


                            className="search-icon"


                        />






                        {

                            result.length>0 && (


                                <div className="search-result">


                                    {

                                        result.map(item=>(


                                            <div


                                                key={item.path}


                                                className="search-item"


                                                onClick={()=>handleGo(item)}


                                            >


                                                {item.name}


                                            </div>


                                        ))


                                    }


                                </div>


                            )

                        }



                    </div>









                    {/* NOTIFICATION */}


                    <div className="notification-icon">


                        <Bell size={21}/>


                    </div>









                    {/* USER */}


                    <Nav>


                        <NavDropdown


                            align="end"


                            id="user-dropdown"


                            title={


                                <div className="user-dropdown-title">



                                    <img


                                        src={

                                            user?.avatar

                                            ?

                                                `/images/${user.avatar}`

                                            :

                                                "/images/avatar.png"

                                        }


                                        alt="avatar"


                                        className="header-avatar"


                                    />





                                    <span className="header-username">


                                        {user?.fullName || "Tài khoản"}


                                    </span>



                                </div>


                            }


                        >




                            <NavDropdown.Item

                                as={Link}

                                to="/profile"

                            >

                                Hồ sơ

                            </NavDropdown.Item>





                            <NavDropdown.Divider />







                            <NavDropdown.Item

                                onClick={handleLogout}

                            >

                                Đăng xuất

                            </NavDropdown.Item>




                        </NavDropdown>


                    </Nav>





                </div>





            </Container>


        </Navbar>


    );


}



export default Header;