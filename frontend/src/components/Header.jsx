import { Navbar, Container, Nav, NavDropdown } from "react-bootstrap";
import { Link } from "react-router-dom";


function Header() {


    return (


        <Navbar 
            bg="white"
            className="shadow-sm"
        >


            <Container fluid>


                <Navbar.Brand>

                    <strong>
                        Hệ thống Quản lý công việc
                    </strong>

                </Navbar.Brand>





                <Nav className="ms-auto">


                    <NavDropdown

                        title="Tài khoản"

                        id="user-dropdown"

                    >


                        <NavDropdown.Item

                            as={Link}

                            to="/profile"

                        >

                            Hồ sơ

                        </NavDropdown.Item>





                        <NavDropdown.Divider />





                        <NavDropdown.Item

                            as={Link}

                            to="/login"

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