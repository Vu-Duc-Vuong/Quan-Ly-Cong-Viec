import {
    Button,
    OverlayTrigger,
    Tooltip
} from "react-bootstrap";


function TaskCard({
    task,
    onEdit,
    onDelete,
    onChangeStatus
}) {


    const priorityLabels = {

        HIGH: "Cao",

        MEDIUM: "Trung bình",

        LOW: "Thấp"

    };



    const statusLabels = {

        TODO: "Chưa làm",

        DOING: "Đang làm",

        DONE: "Hoàn thành"

    };



    const nextStatus = {

        TODO: "DOING",

        DOING: "DONE",

        DONE: "TODO"

    };



    const currentStatus = task.status || "TODO";



    const handleStatusClick = ()=>{

        onChangeStatus(

            task,

            nextStatus[currentStatus]

        );

    };




    return (

<tr>


{/* TÊN CÔNG VIỆC */}

<td className="task-name-cell">


<span

className={

currentStatus === "DONE"

?

"task-done"

:

""

}

>

{task.title}

</span>





{

task.description &&


<OverlayTrigger

placement="top"

overlay={

<Tooltip>

{task.description}

</Tooltip>

}

>


<span

className="description-icon ms-2"

>

📝

</span>


</OverlayTrigger>

}



</td>









{/* DANH MỤC */}

<td>


{

task.category

?

task.category.name

:

<span className="text-muted">

Chưa có

</span>

}


</td>











{/* TRẠNG THÁI */}

<td>


<OverlayTrigger

placement="top"

overlay={

<Tooltip>

Bấm để đổi trạng thái

</Tooltip>

}

>


<button

type="button"

aria-label="Đổi trạng thái công việc"

className={

`
status-badge 
cursor-pointer

${
currentStatus === "TODO"

?

"status-todo"

:

currentStatus === "DOING"

?

"status-doing"

:

"status-done"

}

`

}


onClick={handleStatusClick}

>


{

statusLabels[currentStatus]

}


</button>


</OverlayTrigger>



</td>









{/* MỨC ƯU TIÊN */}

<td>


<span

className={

`
priority 
${
task.priority

?

task.priority.toLowerCase()

:

"medium"

}
`

}

>


{

priorityLabels[task.priority]

||

"Trung bình"

}


</span>


</td>









{/* HẠN HOÀN THÀNH */}

<td>


{

task.deadline

?


new Date(task.deadline)

.toLocaleDateString("vi-VN")


:


<span className="deadline-empty">

Chưa có

</span>

}


</td>









{/* THAO TÁC */}

<td>


<div className="task-actions">


<Button

size="sm"

variant="outline-primary"

onClick={()=>onEdit(task)}

>

Sửa

</Button>





<Button

size="sm"

variant="outline-danger"

onClick={()=>onDelete(task.id)}

>

Xóa

</Button>


</div>


</td>





</tr>


    );


}


export default TaskCard;