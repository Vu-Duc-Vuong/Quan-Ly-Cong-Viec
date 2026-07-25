import { Nav } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";


function Sidebar() {


    const location = useLocation();



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
        }

    ];




    return (


        <div className="sidebar p-3">


            <h3 className="sidebar-title text-center mb-5">

                Manager

            </h3>




            <Nav className="flex-column gap-2">



                {
                    menuItems.map(item=>(


                        <Nav.Link

                            key={item.path}

                            as={Link}

                            to={item.path}


                            className={

                                location.pathname === item.path

                                ?

                                "menu-item menu-active"

                                :

                                "menu-item"

                            }


                        >

                            {item.name}


                        </Nav.Link>


                    ))
                }



            </Nav>



        </div>


    );


}


export default Sidebar;