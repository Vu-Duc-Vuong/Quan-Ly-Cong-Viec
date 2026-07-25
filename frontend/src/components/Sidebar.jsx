import { Nav } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";


function Sidebar() {


    const location = useLocation();



    return (

        <div className="sidebar p-3">


            <h3 className="sidebar-title text-center mb-4">

                Manager

            </h3>




            <Nav className="flex-column">


                <Nav.Link

                    as={Link}

                    to="/"

                    className={
                        "menu-item " +
                        (
                            location.pathname === "/"
                            ?
                            "menu-active"
                            :
                            ""
                        )
                    }

                >

                    Trang chủ

                </Nav.Link>





                <Nav.Link

                    as={Link}

                    to="/tasks"

                    className={
                        "menu-item " +
                        (
                            location.pathname === "/tasks"
                            ?
                            "menu-active"
                            :
                            ""
                        )
                    }

                >

                    Công việc

                </Nav.Link>





                <Nav.Link

                    as={Link}

                    to="/statistics"

                    className="menu-item"

                >

                    Thống kê

                </Nav.Link>





                <Nav.Link

                    as={Link}

                    to="/categories"

                    className="menu-item"

                >

                    Danh mục

                </Nav.Link>





                <Nav.Link

                    as={Link}

                    to="/calendar"

                    className="menu-item"

                >

                    Lịch làm việc

                </Nav.Link>



            </Nav>


        </div>

    );


}


export default Sidebar;