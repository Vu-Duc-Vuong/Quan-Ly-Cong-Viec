import { useEffect, useMemo, useState } from "react";

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

import "../assets/header.css";

function Header() {

    const [user, setUser] = useState(null);

    const [keyword, setKeyword] = useState("");

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

    // Đồng bộ với Sidebar
    const menuItems = [

        {
            name: "Trang chủ",
            path: "/"
        },

        {
            name: "Công việc",
            path: "/tasks"
        },

        {
            name: "Thống kê",
            path: "/statistics"
        },

        {
            name: "Danh mục",
            path: "/categories"
        },

        {
            name: "Lịch làm việc",
            path: "/calendar"
        },

        {
            name: "Hồ sơ",
            path: "/profile"
        }

    ];

    const result = useMemo(() => {

        if (!keyword.trim()) {

            return [];

        }

        return menuItems.filter(item =>

            item.name
                .toLowerCase()
                .includes(keyword.toLowerCase())

        );

    }, [keyword]);

    const handleGo = (item) => {

        navigate(item.path);

        setKeyword("");

    };

    const handleEnter = (e) => {

        if (

            e.key === "Enter"

            &&

            result.length > 0

        ) {

            handleGo(result[0]);

        }

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

                <div className="header-search">

                    <Form.Control

                        value={keyword}

                        onChange={e => setKeyword(e.target.value)}

                        onKeyDown={handleEnter}

                        placeholder="Tìm kiếm chức năng..."

                    />

                    <img

                        src="http://localhost:3000/images/kinhlup.png"

                        alt="search"

                        className="search-icon"

                    />

                    {

                        result.length > 0 && (

                            <div className="search-result">

                                {

                                    result.map(item => (

                                        <div

                                            key={item.path}

                                            className="search-item"

                                            onClick={() => handleGo(item)}

                                        >

                                            {item.name}

                                        </div>

                                    ))

                                }

                            </div>

                        )

                    }

                </div>

                {/* USER */}

                <Nav className="ms-auto">

                    <NavDropdown

                        align="end"

                        id="user-dropdown"

                        title={

                            <div className="user-dropdown-title">

                                <img

                                    src={
                                        user?.avatar
                                            ? `http://localhost:3000/images/${user.avatar}`
                                            : "http://localhost:3000/images/avatar.png"
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

            </Container>

        </Navbar>

    );

}

export default Header;