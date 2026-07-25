import { useEffect, useState } from "react";


import {
    getTasks,
    createTask,
    updateTask,
    deleteTask,
    completeTask
} from "../services/taskService";



function Tasks() {


    const [tasks, setTasks] = useState([]);



    const [editId, setEditId] = useState(null);



    const [form, setForm] = useState({

        title:"",
        description:"",
        priority:"MEDIUM",
        deadline:""

    });





    const loadTasks = async () => {

        try {

            const response = await getTasks();

            setTasks(response.data);

        } catch(error){

            console.log(error);

        }

    };





    useEffect(()=>{

        loadTasks();

    },[]);







    const handleChange = (e)=>{

        setForm({

            ...form,

            [e.target.name]:e.target.value

        });

    };








    const resetForm = ()=>{

        setForm({

            title:"",
            description:"",
            priority:"MEDIUM",
            deadline:""

        });

        setEditId(null);

    };









    const handleSubmit = async(e)=>{

        e.preventDefault();



        if(!form.title.trim()){

            alert("Vui lòng nhập tên công việc");

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









    // đưa dữ liệu lên form sửa

    const handleEdit = (task)=>{


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









    const handleComplete = async(id)=>{


        await completeTask(id);


        loadTasks();


    };









    const handleDelete = async(id)=>{


        await deleteTask(id);


        loadTasks();


    };









return (

<div>


<h2>
Quản lý công việc
</h2>





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





<button type="submit">

{

editId

?

"Lưu"

:

"Thêm"

}

</button>



{

editId &&

<button

type="button"

onClick={resetForm}

>

Hủy

</button>

}



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

tasks.map((task)=>(


<tr key={task.id}>


<td>
{task.id}
</td>


<td>
{task.title}
</td>


<td>
{task.description}
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

new Date(task.deadline).toLocaleDateString()

:

""

}

</td>





<td>


{

task.status !== "DONE" &&

<button

onClick={()=>handleComplete(task.id)}

>

Hoàn thành

</button>

}





<button

onClick={()=>handleEdit(task)}

>

Sửa

</button>





<button

onClick={()=>handleDelete(task.id)}

>

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