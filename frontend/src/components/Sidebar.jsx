import {
    Nav
} from "react-bootstrap";


import {
    Link,
    useLocation
} from "react-router-dom";


import {
    Home,
    ListTodo,
    BarChart3,
    FolderKanban,
    CalendarDays
} from "lucide-react";



function Sidebar() {


    const location = useLocation();




    const menuItems = [


        {
            name:"Trang chủ",
            path:"/",
            icon:<Home size={18}/>
        },


        {
            name:"Công việc",
            path:"/tasks",
            icon:<ListTodo size={18}/>
        },


        {
            name:"Thống kê",
            path:"/statistics",
            icon:<BarChart3 size={18}/>
        },


        {
            name:"Danh mục",
            path:"/categories",
            icon:<FolderKanban size={18}/>
        },


        {
            name:"Lịch làm việc",
            path:"/calendar",
            icon:<CalendarDays size={18}/>
        }


    ];







    return (


        <div className="sidebar">





            {/* LOGO */}


            <h3 className="sidebar-title">


                <span className="brand-task">

                    Task

                </span>


                <span className="brand-it">

                    IT

                </span>



            </h3>









            {/* MENU */}


            <Nav className="flex-column">


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




                            <span className="menu-icon">


                                {item.icon}


                            </span>





                            <span>


                                {item.name}


                            </span>




                        </Nav.Link>



                    ))


                }



            </Nav>






        </div>


    );


}



export default Sidebar;