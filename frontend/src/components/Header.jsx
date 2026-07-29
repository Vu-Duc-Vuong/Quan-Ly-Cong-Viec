import { useEffect, useState } from "react";

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

function Header() {

    const [user, setUser] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {

        const userData = localStorage.getItem("user");

        if (userData) {

            setUser(JSON.parse(userData));

        }

    }, []);

    const handleLogout = () => {

        localStorage.removeItem("user");
        localStorage.removeItem("token");

        setUser(null);

        navigate("/login");

    };

    return (

        <Navbar
            bg="white"
            className="shadow-sm header-fixed py-2"
        >

            <Container fluid>

                {/* LOGO */}

                <Navbar.Brand>

                    <strong>

                        Hệ thống Quản lý công việc

                    </strong>

                </Navbar.Brand>



                {/* SEARCH */}

                <div
                    className="mx-auto"
                    style={{
                        width: "420px",
                        position: "relative"
                    }}
                >

                    <Form.Control

                        type="text"

                        placeholder="Tìm kiếm chức năng..."

                        style={{
                            borderRadius: "999px",
                            paddingRight: "45px",
                            background: "#f5f5f5"
                        }}

                    />

                    <img

                        src="http://localhost:3000/images/kinhlup.png"

                        alt="Search"

                        style={{

                            position: "absolute",

                            right: "15px",

                            top: "50%",

                            transform: "translateY(-50%)",

                            width: "20px",

                            height: "20px",

                            opacity: 0.7

                        }}

                    />

                </div>



                {/* USER */}

                <Nav className="ms-auto">

                    <NavDropdown

                        align="end"

                        id="user-dropdown"

                        title={

                            <span
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "10px"
                                }}
                            >

                                <img

                                    src={
                                        user?.avatar
                                            ? `http://localhost:3000/images/${user.avatar}`
                                            : "https://ui-avatars.com/api/?name=" +
                                              encodeURIComponent(
                                                  user?.fullName || "User"
                                              )
                                    }

                                    alt="Avatar"

                                    style={{

                                        width: "38px",

                                        height: "38px",

                                        borderRadius: "50%",

                                        objectFit: "cover"

                                    }}

                                />

                                <span>

                                    {user?.fullName || "Tài khoản"}

                                </span>

                            </span>

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

            </Container>

        </Navbar>

    );

}

export default Header;