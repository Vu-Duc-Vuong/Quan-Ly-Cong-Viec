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


<span

className="description-icon"

>

📝

</span>


</OverlayTrigger>


}



</td>









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









<td>


{

task.deadline

?

new Date(task.deadline)
.toLocaleDateString()

:

<span className="deadline-empty">

Chưa có

</span>

}



</td>









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