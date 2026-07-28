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



                {/* HEADER CỐ ĐỊNH */}

                <header className="header-fixed">

                    <Header />

                </header>





                {/* CHỈ CONTENT NÀY CUỘN */}

                <main className="main-scroll">


                    <Outlet />


                </main>



            </div>



        </div>

    );


}


export default MainLayout;