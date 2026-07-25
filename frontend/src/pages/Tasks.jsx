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


<h2>
Quản lý công việc
</h2>





<h3>
Tìm kiếm
</h3>


<input

placeholder="Nhập tên công việc"

value={keyword}

onChange={(e)=>setKeyword(e.target.value)}

/>


<button onClick={handleSearch}>
Tìm
</button>




<button onClick={handleToday}>
Hôm nay
</button>



<button onClick={handleOverdue}>
Quá hạn
</button>





<h3>
Lọc trạng thái
</h3>


<button onClick={()=>handleStatus("ALL")}>
Tất cả
</button>


<button onClick={()=>handleStatus("TODO")}>
TODO
</button>


<button onClick={()=>handleStatus("DOING")}>
DOING
</button>


<button onClick={()=>handleStatus("DONE")}>
DONE
</button>





<h3>
Lọc Priority
</h3>


<button onClick={()=>handlePriority("ALL")}>
ALL
</button>


<button onClick={()=>handlePriority("LOW")}>
LOW
</button>


<button onClick={()=>handlePriority("MEDIUM")}>
MEDIUM
</button>


<button onClick={()=>handlePriority("HIGH")}>
HIGH
</button>


<button onClick={resetFilter}>
Reset
</button>





<hr/>





<h3>

{
editId
?
"Sửa công việc"
:
"Thêm công việc"

}

</h3>




<form onSubmit={handleSubmit}>


<input

name="title"

placeholder="Tên công việc"

value={form.title}

onChange={handleChange}

/>



<br/>


<input

name="description"

placeholder="Mô tả"

value={form.description}

onChange={handleChange}

/>



<br/>


<select

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


</select>



<br/>



<input

type="date"

name="deadline"

value={form.deadline}

onChange={handleChange}

/>



<br/>



<button>

{
editId
?
"Lưu"
:
"Thêm"
}

</button>


</form>





<hr/>





<table border="1" width="100%">


<thead>

<tr>

<th>ID</th>
<th>Tên</th>
<th>Mô tả</th>
<th>Status</th>
<th>Priority</th>
<th>Deadline</th>
<th>Thao tác</th>

</tr>

</thead>




<tbody>


{

tasks.map(task=>(


<tr key={task.id}>


<td>{task.id}</td>


<td>{task.title}</td>


<td>{task.description}</td>


<td>{task.status}</td>


<td>{task.priority}</td>


<td>

{

task.deadline
?
new Date(task.deadline).toLocaleDateString()
:
""

}

</td>


<td>


{

task.status!=="DONE" &&

<button onClick={()=>handleComplete(task.id)}>

Hoàn thành

</button>

}



<button onClick={()=>handleEdit(task)}>
Sửa
</button>



<button onClick={()=>handleDelete(task.id)}>
Xóa
</button>



</td>


</tr>


))


}


</tbody>


</table>



</div>

);


}


export default Tasks;