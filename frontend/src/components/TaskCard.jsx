import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";


function TaskCard({
    task,
    onComplete,
    onEdit,
    onDelete
}) {


    return (

        <Card className="mb-3 shadow-sm">


            <Card.Body>


                <Card.Title>

                    {task.title}

                </Card.Title>



                <Card.Text>

                    {task.description}

                </Card.Text>



                <p>
                    Status:
                    <b> {task.status}</b>
                </p>



                <p>
                    Priority:
                    <b> {task.priority}</b>
                </p>



                {
                    task.deadline &&

                    <p>

                        Deadline:

                        {
                            " "
                            +
                            new Date(task.deadline)
                            .toLocaleDateString()
                        }

                    </p>
                }




                {
                    task.status !== "DONE" &&

                    <Button
                    variant="success"
                    className="me-2"
                    onClick={()=>onComplete(task.id)}
                    >

                        Hoàn thành

                    </Button>

                }




                <Button
                variant="warning"
                className="me-2"
                onClick={()=>onEdit(task)}
                >

                    Sửa

                </Button>




                <Button
                variant="danger"
                onClick={()=>onDelete(task.id)}
                >

                    Xóa

                </Button>




            </Card.Body>


        </Card>

    );

}


export default TaskCard;