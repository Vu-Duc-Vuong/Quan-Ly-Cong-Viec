import { useEffect, useState } from "react";

import {
    Navbar,
    Container,
    Nav,
    NavDropdown
} from "react-bootstrap";

import { Link, useNavigate } from "react-router-dom";


function Header() {


    const [user,setUser] = useState(null);

    const navigate = useNavigate();



    useEffect(()=>{


        const userData = localStorage.getItem("user");


        if(userData){

            setUser(JSON.parse(userData));

        }


    },[]);





    const handleLogout=()=>{


        localStorage.removeItem("user");

        localStorage.removeItem("token");


        setUser(null);


        navigate("/login");


    };





    return (


        <Navbar

            bg="white"

            className="shadow-sm header-fixed"

        >


            <Container fluid>



                <Navbar.Brand>


                    <strong>

                        Hệ thống Quản lý công việc

                    </strong>


                </Navbar.Brand>







                <Nav className="ms-auto">



                    <NavDropdown


                        title={

                            user?.fullName

                            ||

                            "Tài khoản"

                        }


                        id="user-dropdown"


                        align="end"


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