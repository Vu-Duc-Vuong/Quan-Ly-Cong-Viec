import { useEffect, useState } from "react";

import {
    FilePenLine
} from "lucide-react";

import {
    getTasks
} from "../services/taskService";


function Dashboard() {


    const [tasks,setTasks] = useState([]);



    const loadTasks = async()=>{

        try{

            const response = await getTasks();

            setTasks(response.data);

        }
        catch(error){

            console.log(error);

        }

    };



    useEffect(()=>{

        loadTasks();

    },[]);





    const total = tasks.length;


    const todo = tasks.filter(
        task=>task.status==="TODO"
    ).length;



    const doing = tasks.filter(
        task=>task.status==="DOING"
    ).length;



    const done = tasks.filter(
        task=>task.status==="DONE"
    ).length;



    const high = tasks.filter(
        task=>task.priority==="HIGH"
    ).length;




    const overdue = tasks.filter(task=>{

        if(!task.deadline){

            return false;

        }


        return new Date(task.deadline) < new Date()
        &&
        task.status !== "DONE";


    }).length;






    const convertStatus=(status)=>{

        switch(status){

            case "TODO":
                return "Chưa làm";

            case "DOING":
                return "Đang làm";

            case "DONE":
                return "Hoàn thành";

            default:
                return status;

        }

    };






    const convertPriority=(priority)=>{

        switch(priority){

            case "HIGH":
                return "Cao";

            case "MEDIUM":
                return "Trung bình";

            case "LOW":
                return "Thấp";

            default:
                return priority;

        }

    };







    const cards = [

        {
            title:"Tổng công việc",
            value:total,
            color:"stat-blue"
        },

        {
            title:"Chưa làm",
            value:todo,
            color:"stat-blue"
        },

        {
            title:"Đang làm",
            value:doing,
            color:"stat-orange"
        },

        {
            title:"Hoàn thành",
            value:done,
            color:"stat-green"
        },

        {
            title:"Ưu tiên cao",
            value:high,
            color:"stat-red"
        },

        {
            title:"Quá hạn",
            value:overdue,
            color:"stat-red"
        }

    ];








    return (

        <div>


            <h2 className="mb-1">

                Dashboard

            </h2>


            <p className="text-muted">

                Tổng quan công việc

            </p>








            <div className="row g-3 mb-4">


                {
                    cards.map((card,index)=>(


                        <div 
                            className="col-md-4"
                            key={index}
                        >


                            <div 
                                className={`metric-card ${card.color}`}
                            >


                                <div className="metric-title">

                                    {card.title}

                                </div>



                                <div className="metric-number">

                                    {card.value}

                                </div>


                            </div>


                        </div>


                    ))
                }



            </div>









            <div className="card border-0 shadow-sm p-3">


                <h4 className="mb-3">

                    Danh sách công việc gần đây

                </h4>









                <table className="table table-custom mb-0">


                    <thead>


                        <tr>


                            <th>

                                Tên

                            </th>


                            <th>

                                Trạng thái

                            </th>


                            <th>

                                Ưu tiên

                            </th>


                            <th>

                                Deadline

                            </th>


                        </tr>


                    </thead>









                    <tbody>


                        {

                            tasks.slice(0,5).map(task=>(


                                <tr key={task.id}>


                                    <td>


                                        <div className="task-name-cell">


                                            <FilePenLine

                                                size={17}

                                                className="task-name-icon"

                                            />


                                            <span>

                                                {task.title}

                                            </span>


                                        </div>


                                    </td>







                                    <td>


                                        <span

                                            className={

                                                `status-badge ${
                                                    
                                                    task.status==="TODO"

                                                    ?

                                                    "status-todo"

                                                    :

                                                    task.status==="DOING"

                                                    ?

                                                    "status-doing"

                                                    :

                                                    "status-done"

                                                }`

                                            }

                                        >

                                            {convertStatus(task.status)}


                                        </span>


                                    </td>








                                    <td>


                                        <span

                                            className={

                                                `priority-badge priority-${task.priority?.toLowerCase()}`

                                            }

                                        >


                                            {convertPriority(task.priority)}


                                        </span>


                                    </td>








                                    <td>


                                        {

                                            task.deadline

                                            ?

                                            new Date(task.deadline)
                                            .toLocaleDateString("vi-VN")

                                            :

                                            "Chưa có"

                                        }


                                    </td>



                                </tr>


                            ))

                        }



                    </tbody>



                </table>



            </div>





        </div>

    );


}


export default Dashboard;