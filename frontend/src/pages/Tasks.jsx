import { useEffect, useState } from "react";

import {
    getTasks,
    searchTasks,
    getTodayTasks,
    getOverdueTasks,
    createTask,
    updateTask,
    deleteTask,
    completeTask
} from "../services/taskService";


import TaskCard from "../components/TaskCard";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";



function Tasks() {


    const [tasks,setTasks] = useState([]);

    const [allTasks,setAllTasks] = useState([]);


    const [editId,setEditId] = useState(null);


    const [keyword,setKeyword] = useState("");


    const [statusFilter,setStatusFilter] = useState("ALL");


    const [priorityFilter,setPriorityFilter] = useState("ALL");



    const [form,setForm] = useState({

        title:"",
        description:"",
        priority:"MEDIUM",
        deadline:""

    });





    const loadTasks = async()=>{


        const response = await getTasks();


        setTasks(response.data);

        setAllTasks(response.data);


    };




    useEffect(()=>{

        loadTasks();

    },[]);






    const handleChange=(e)=>{

        setForm({

            ...form,

            [e.target.name]:e.target.value

        });

    };







    const resetForm=()=>{

        setForm({

            title:"",
            description:"",
            priority:"MEDIUM",
            deadline:""

        });


        setEditId(null);

    };







    const handleSubmit=async(e)=>{

        e.preventDefault();


        if(!form.title.trim()){

            alert("Nhập tên công việc");

            return;

        }



        if(editId){

            await updateTask(editId,form);

        }
        else{

            await createTask(form);

        }


        resetForm();

        loadTasks();


    };







    const handleEdit=(task)=>{


        setEditId(task.id);



        setForm({

            title:task.title,

            description:task.description || "",

            priority:task.priority,

            deadline:

            task.deadline

            ?

            task.deadline.substring(0,10)

            :

            ""

        });


    };








    const applyFilter=(data)=>{


        let result=[...data];



        if(statusFilter!=="ALL"){

            result=result.filter(
                task=>task.status===statusFilter
            );

        }



        if(priorityFilter!=="ALL"){

            result=result.filter(
                task=>task.priority===priorityFilter
            );

        }



        setTasks(result);


    };








    const handleSearch=async()=>{


        if(!keyword){

            applyFilter(allTasks);

            return;

        }



        const response = await searchTasks(keyword);


        applyFilter(response.data);


    };







    const handleToday=async()=>{

        const response = await getTodayTasks();

        setTasks(response.data);

    };





    const handleOverdue=async()=>{

        const response = await getOverdueTasks();

        setTasks(response.data);

    };








    const handleStatus=(status)=>{


        setStatusFilter(status);


        let result=[...allTasks];



        if(status!=="ALL"){

            result=result.filter(
                task=>task.status===status
            );

        }



        if(priorityFilter!=="ALL"){

            result=result.filter(
                task=>task.priority===priorityFilter
            );

        }


        setTasks(result);


    };









    const handlePriority=(priority)=>{


        setPriorityFilter(priority);


        let result=[...allTasks];



        if(statusFilter!=="ALL"){

            result=result.filter(
                task=>task.status===statusFilter
            );

        }



        if(priority!=="ALL"){

            result=result.filter(
                task=>task.priority===priority
            );

        }



        setTasks(result);


    };








    const resetFilter=()=>{


        setStatusFilter("ALL");

        setPriorityFilter("ALL");

        loadTasks();


    };







    const handleComplete=async(id)=>{

        await completeTask(id);

        loadTasks();

    };







    const handleDelete=async(id)=>{


        await deleteTask(id);

        loadTasks();


    };









return (

<div>


<h2 className="mb-4">

Quản lý công việc

</h2>






<Card className="shadow-sm mb-4">


<Card.Body>


<h5>
Tìm kiếm và lọc
</h5>



<Form.Control

placeholder="Nhập tên công việc"

value={keyword}

onChange={
e=>setKeyword(e.target.value)
}

/>



<div className="mt-3">


<Button
className="me-2"
onClick={handleSearch}
>

Tìm

</Button>



<Button
variant="success"
className="me-2"
onClick={handleToday}
>

Hôm nay

</Button>




<Button
variant="danger"
onClick={handleOverdue}
>

Quá hạn

</Button>


</div>





<hr/>




<h6>Status</h6>


{
["ALL","TODO","DOING","DONE"].map(status=>(


<Button

key={status}

variant="outline-primary"

className="me-2"

onClick={()=>handleStatus(status)}

>

{status}

</Button>


))

}






<h6 className="mt-3">
Priority
</h6>



{
["ALL","LOW","MEDIUM","HIGH"].map(priority=>(


<Button

key={priority}

variant="outline-warning"

className="me-2"

onClick={()=>handlePriority(priority)}

>

{priority}

</Button>


))

}





<Button

variant="secondary"

onClick={resetFilter}

>

Reset

</Button>



</Card.Body>


</Card>









<Card className="shadow-sm mb-4">


<Card.Body>


<h5>

{
editId
?
"Sửa công việc"
:
"Thêm công việc"

}

</h5>




<Form onSubmit={handleSubmit}>


<Form.Control

className="mb-2"

name="title"

placeholder="Tên công việc"

value={form.title}

onChange={handleChange}

/>



<Form.Control

className="mb-2"

name="description"

placeholder="Mô tả"

value={form.description}

onChange={handleChange}

/>





<Form.Select

className="mb-2"

name="priority"

value={form.priority}

onChange={handleChange}

>


<option value="LOW">
LOW
</option>


<option value="MEDIUM">
MEDIUM
</option>


<option value="HIGH">
HIGH
</option>


</Form.Select>





<Form.Control

className="mb-2"

type="date"

name="deadline"

value={form.deadline}

onChange={handleChange}

/>





<Button type="submit">

{
editId
?
"Lưu"
:
"Thêm"
}

</Button>



</Form>


</Card.Body>


</Card>








<div className="row">


{

tasks.map(task=>(


<div

className="col-md-4"

key={task.id}

>


<TaskCard

task={task}

onComplete={handleComplete}

onEdit={handleEdit}

onDelete={handleDelete}

/>


</div>


))


}



</div>





</div>


);


}



export default Tasks;