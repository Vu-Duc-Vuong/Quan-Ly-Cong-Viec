import { useEffect, useState } from "react";

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








    return (

        <div>


            <h2>
                Dashboard
            </h2>



            <p>
                Tổng quan công việc
            </p>





            <div
            style={{
                display:"grid",
                gridTemplateColumns:"repeat(3,1fr)",
                gap:"20px"
            }}
            >





                <div className="card p-3">

                    <h4>
                        Tổng công việc
                    </h4>

                    <h2>
                        {total}
                    </h2>

                </div>







                <div className="card p-3">

                    <h4>
                        Chưa làm
                    </h4>

                    <h2>
                        {todo}
                    </h2>

                </div>








                <div className="card p-3">

                    <h4>
                        Đang làm
                    </h4>

                    <h2>
                        {doing}
                    </h2>

                </div>








                <div className="card p-3">

                    <h4>
                        Hoàn thành
                    </h4>

                    <h2>
                        {done}
                    </h2>

                </div>








                <div className="card p-3">

                    <h4>
                        Ưu tiên cao
                    </h4>

                    <h2>
                        {high}
                    </h2>

                </div>








                <div className="card p-3">

                    <h4>
                        Quá hạn
                    </h4>

                    <h2>
                        {overdue}
                    </h2>

                </div>





            </div>







            <hr/>





            <h3>
                Danh sách công việc gần đây
            </h3>





            <table className="table table-bordered">


                <thead>

                    <tr>

                        <th>
                            Tên
                        </th>


                        <th>
                            Status
                        </th>


                        <th>
                            Priority
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
                                    {task.title}
                                </td>


                                <td>
                                    {task.status}
                                </td>


                                <td>
                                    {task.priority}
                                </td>


                                <td>

                                    {
                                        task.deadline
                                        ?
                                        new Date(task.deadline)
                                        .toLocaleDateString()
                                        :
                                        ""
                                    }

                                </td>


                            </tr>


                        ))
                    }


                </tbody>



            </table>






        </div>

    );


}


export default Dashboard;