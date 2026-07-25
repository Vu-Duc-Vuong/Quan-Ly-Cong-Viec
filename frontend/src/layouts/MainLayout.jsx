import { Container, Row, Col } from "react-bootstrap";
import { Outlet } from "react-router-dom";

import Sidebar from "../components/Sidebar";
import Header from "../components/Header";


function MainLayout() {


    return (

        <Container fluid className="p-0">


            <Row className="g-0">


                <Col md={2}>

                    <Sidebar />

                </Col>





                <Col md={10}>


            <div className="sticky-top">

              <Header />

            </div>


                    <div className="main-content">

                        <Outlet />

                    </div>


                </Col>



            </Row>


        </Container>

    );


}


export default MainLayout;