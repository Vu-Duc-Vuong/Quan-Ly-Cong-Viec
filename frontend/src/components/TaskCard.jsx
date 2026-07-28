import {
    Button,
    OverlayTrigger,
    Tooltip
} from "react-bootstrap";


function TaskCard({
    task,
    onEdit,
    onDelete,
    onComplete
}) {


    return (

<tr>


<td className="text-center">

<input

type="checkbox"

checked={task.status === "DONE"}

onChange={() => onComplete(task)}

/>

</td>





<td>

<span

className={
task.status === "DONE"
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


<span className="description-icon">

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

<span>

{task.category.name}

</span>


:

<span className="text-muted">

Chưa có

</span>

}


</td>






{/* STATUS */}

<td>


{

task.status === "TODO"

&&

<span className="status-badge todo">

TODO

</span>

}



{

task.status === "DOING"

&&

<span className="status-badge doing">

DOING

</span>

}



{

task.status === "DONE"

&&

<span className="status-badge done">

DONE

</span>

}


</td>







{/* PRIORITY */}

<td>


{

task.priority === "HIGH"

&&

<span className="priority high">

HIGH

</span>

}



{

task.priority === "MEDIUM"

&&

<span className="priority medium">

MEDIUM

</span>

}



{

task.priority === "LOW"

&&

<span className="priority low">

LOW

</span>

}


</td>







{/* DEADLINE */}

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







{/* ACTION */}

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