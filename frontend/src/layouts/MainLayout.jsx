import { Outlet } from "react-router-dom";

import Sidebar from "../components/Sidebar";
import Header from "../components/Header";


function MainLayout() {


    return (

        <div className="app-layout">


            {/* SIDEBAR CỐ ĐỊNH */}

            <aside className="sidebar-fixed">

                <Sidebar />

            </aside>





            {/* KHU VỰC BÊN PHẢI */}

            <div className="content-area">



                {/* HEADER */}

                <header className="header-fixed">

                    <Header />

                </header>





                {/* CONTENT CUỘN */}

                <main className="main-scroll">


                    <div className="page-container">


                        <Outlet />


                    </div>


                </main>



            </div>



        </div>

    );


}


export default MainLayout;