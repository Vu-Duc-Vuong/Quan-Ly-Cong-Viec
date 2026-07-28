import { useEffect, useState } from "react";
import "../assets/task.css";

import {
    getTasks,
    searchTasks,
    getTodayTasks,
    getOverdueTasks,
    createTask,
    updateTask,
    deleteTask
} from "../services/taskService";

import {
    getMember3Categories
} from "../member3/services/member3Service";

import TaskCard from "../components/TaskCard";


import {
    Button,
    Form,
    Card,
    Row,
    Col
} from "react-bootstrap";



function Tasks() {


    const [tasks,setTasks] = useState([]);

    const [allTasks,setAllTasks] = useState([]);


    const [categories,setCategories] = useState([]);


    const [editId,setEditId] = useState(null);


    const [keyword,setKeyword] = useState("");


    const [statusFilter,setStatusFilter] = useState("ALL");


    const [priorityFilter,setPriorityFilter] = useState("ALL");
    const [categoryFilter,setCategoryFilter] = useState("ALL");

    const selectAll = tasks.length > 0 &&
    tasks.every(task => task.status === "DONE");





    const [form,setForm] = useState({

        title:"",
        description:"",
        priority:"MEDIUM",
        deadline:"",
        categoryId:""

    });





    const loadTasks = async()=>{

        const response = await getTasks();

        setTasks(response.data);

        setAllTasks(response.data);

    };




    const loadCategories = async()=>{

        try{

            const response = await getMember3Categories();

            setCategories(response.data);

        }
        catch(error){

            console.log(error);

        }

    };





    useEffect(()=>{

        loadTasks();

        loadCategories();

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
            deadline:"",
            categoryId:""

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
            "",

            categoryId:
            task.category?.id || ""

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









    const handleComplete = async(task)=>{


    const newStatus = 
        task.status === "DONE"
        ?
        "TODO"
        :
        "DONE";



    await updateTask(

        task.id,

        {

            title: task.title,

            description: task.description || "",

            priority: task.priority,

            deadline:
            task.deadline
            ?
            task.deadline.substring(0,10)
            :
            "",

            status:newStatus,

            categoryId:
            task.category?.id || ""

        }

    );


    loadTasks();


};








const handleSelectAll = async()=>{


    const newStatus = selectAll
        ?
        "TODO"
        :
        "DONE";



    await Promise.all(

        tasks.map(task=>

            updateTask(

                task.id,

                {

                    title: task.title,

                    description: task.description || "",

                    priority: task.priority,

                    deadline:
                    task.deadline
                    ?
                    task.deadline.substring(0,10)
                    :
                    "",

                    status:newStatus,

                    categoryId:
                    task.category?.id || ""

                }

            )

        )

    );


    loadTasks();


};








const handleDelete=async(id)=>{

    await deleteTask(id);

    loadTasks();

};







return (

<div className="task-page">


<h2 className="mb-4">
Quản lý công việc
</h2>





<Row className="g-4">





<Col md={4}>


<Card className="shadow-sm sticky-form">


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

className="mb-3"

name="title"

placeholder="Tên công việc"

value={form.title}

onChange={handleChange}

/>





<Form.Control

className="mb-3"

name="description"

placeholder="Mô tả"

value={form.description}

onChange={handleChange}

/>







<Form.Select

className="mb-3"

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






<Form.Select

className="mb-3"

name="categoryId"

value={form.categoryId}

onChange={handleChange}

>


<option value="">
-- Chọn danh mục --
</option>


{

categories.map(category=>(

<option

key={category.id}

value={category.id}

>

{category.name}

</option>

))

}


</Form.Select>






<Form.Control

className="mb-3"

type="date"

name="deadline"

value={form.deadline}

onChange={handleChange}

/>






<div className="d-flex gap-2">


<Button

className="flex-fill"

type="submit"

>

{

editId
?
"Lưu thay đổi"
:
"Thêm công việc"

}


</Button>





{

editId &&

<Button

variant="outline-secondary"

type="button"

onClick={handleCancel}

>

Hủy

</Button>

}


</div>






</Form>



</Card.Body>


</Card>


</Col>






<Col md={8}>


<Card className="shadow-sm mb-4">


<Card.Body>


<h5>
Tìm kiếm và lọc
</h5>


<div className="search-box">


<Form.Control

placeholder="Nhập tên công việc"

value={keyword}

onChange={
e=>setKeyword(e.target.value)
}

/>


<Button onClick={handleSearch}>

Tìm

</Button>


</div>







<div className="filter-line">


<strong>Status:</strong>


{
["ALL","TODO","DOING","DONE"].map(status=>(

<Button

key={status}

size="sm"

variant={
statusFilter===status
?
"primary"
:
"outline-secondary"
}

onClick={()=>handleStatus(status)}

>

{status}

</Button>


))

}


</div>







<div className="filter-line">


<strong>Priority:</strong>


{
["ALL","LOW","MEDIUM","HIGH"].map(priority=>(

<Button

key={priority}

size="sm"

variant={
priorityFilter===priority
?
"primary"
:
"outline-secondary"
}

onClick={()=>handlePriority(priority)}

>

{priority}

</Button>


))

}



<Button

size="sm"

variant="outline-secondary"

onClick={resetFilter}

>

Reset

</Button>


</div>



</Card.Body>


</Card>







<Card className="shadow-sm task-table-card">


<Card.Body>


<h5>
Danh sách công việc
</h5>





<table className="table table-hover align-middle">


<thead>

<tr>

<th></th>

<th>Tên</th>

<th>Danh mục</th>

<th>Status</th>

<th>Priority</th>

<th>Deadline</th>

<th>Thao tác</th>

</tr>


</thead>





<tbody>


{

tasks.length===0

?

<tr>

<td colSpan="7"
className="text-center text-muted">

Không có công việc

</td>

</tr>


:

tasks.map(task=>(


<TaskCard

key={task.id}

task={task}

onComplete={handleComplete}

onEdit={handleEdit}

onDelete={handleDelete}

/>


))


}



</tbody>


</table>



</Card.Body>


</Card>



</Col>


</Row>


</div>


);


}


export default Tasks;