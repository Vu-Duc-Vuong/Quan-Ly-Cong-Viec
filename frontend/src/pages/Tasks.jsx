import { useEffect, useState } from "react";
import "../assets/task.css";

import {
    getTasks,
    searchTasks,
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


    const [tasks, setTasks] = useState([]);

    const [allTasks, setAllTasks] = useState([]);

    const [categories, setCategories] = useState([]);

    const [editId, setEditId] = useState(null);

    const [keyword, setKeyword] = useState("");


    const [statusFilter, setStatusFilter] = useState("ALL");

    const [priorityFilter, setPriorityFilter] = useState("ALL");

    const [categoryFilter, setCategoryFilter] = useState("ALL");



    const [form, setForm] = useState({

        title: "",
        description: "",
        priority: "MEDIUM",
        deadline: "",
        categoryId: ""

    });



    const convertStatus = (status) => {

        const data = {

            ALL: "Tất cả",
            TODO: "Chưa làm",
            DOING: "Đang làm",
            DONE: "Hoàn thành"

        };


        return data[status] || status;

    };



    const convertPriority = (priority) => {

        const data = {

            ALL: "Tất cả",
            LOW: "Thấp",
            MEDIUM: "Trung bình",
            HIGH: "Cao"

        };


        return data[priority] || priority;

    };



    const loadTasks = async () => {

        try {

            const response = await getTasks();

            setTasks(response.data);

            setAllTasks(response.data);

        }
        catch (error) {

            console.log(error);

        }

    };



    const loadCategories = async () => {

        try {

            const response =
                await getMember3Categories();

            setCategories(response.data);

        }
        catch (error) {

            console.log(error);

        }

    };



    useEffect(() => {

        loadTasks();

        loadCategories();

    }, []);




    const handleChange = (e) => {

        setForm({

            ...form,

            [e.target.name]: e.target.value

        });

    };




    const resetForm = () => {

        setForm({

            title: "",
            description: "",
            priority: "MEDIUM",
            deadline: "",
            categoryId: ""

        });


        setEditId(null);

    };




    const handleCancel = () => {

        resetForm();

    };




    const handleSubmit = async (e) => {

        e.preventDefault();


        if (!form.title.trim()) {

            alert("Nhập tên công việc");

            return;

        }


        try {


            const data = {

                title: form.title.trim(),

                description:
                    form.description.trim() || undefined,


                priority: form.priority,


                deadline:
                    form.deadline || undefined,


                categoryId:
                    form.categoryId
                        ?
                        Number(form.categoryId)
                        :
                        undefined

            };



            if (editId) {

                await updateTask(
                    editId,
                    data
                );

            }
            else {

                await createTask(
                    data
                );

            }



            resetForm();

            loadTasks();


        }
        catch (error) {

            console.log(
                error.response?.data
            );

        }

    };



    const handleEdit = (task) => {


        setEditId(task.id);


        setForm({

            title: task.title,

            description: task.description || "",

            priority: task.priority,

            deadline:
                task.deadline
                    ?
                    task.deadline.substring(0, 10)
                    :
                    "",


            categoryId:
                task.category?.id
                    ?
                    Number(task.category.id)
                    :
                    undefined

        });


    };
    const handleChangeStatus = async (task, status) => {


        await updateTask(

            task.id,

            {

                title: task.title,

                description: task.description || "",

                priority: task.priority,

                deadline:
                    task.deadline
                        ?
                        task.deadline.substring(0, 10)
                        :
                        "",


                status: status,


                categoryId:
                    task.category?.id || ""

            }

        );


        loadTasks();

    };



    const handleDelete = async (id) => {

        try {

            await deleteTask(id);

            loadTasks();

        }
        catch (error) {

            console.log(error);

        }

    }; const applyFilter = (data) => {


        let result = [...data];


        if (statusFilter !== "ALL") {

            result = result.filter(
                task => task.status === statusFilter
            );

        }


        if (priorityFilter !== "ALL") {

            result = result.filter(
                task => task.priority === priorityFilter
            );

        }


        if (categoryFilter !== "ALL") {

            result = result.filter(
                task =>
                    String(task.category?.id)
                    ===
                    String(categoryFilter)
            );

        }


        setTasks(result);

    };





    const filterData = (

        data,
        status = statusFilter,
        priority = priorityFilter,
        category = categoryFilter

    ) => {


        let result = [...data];


        if (status !== "ALL") {

            result = result.filter(
                task => task.status === status
            );

        }


        if (priority !== "ALL") {

            result = result.filter(
                task => task.priority === priority
            );

        }


        if (category !== "ALL") {

            result = result.filter(

                task =>
                    String(task.category?.id)
                    ===
                    String(category)

            );

        }


        return result;

    };




    const handleStatus = (status) => {


        setStatusFilter(status);


        setTasks(

            filterData(
                allTasks,
                status,
                priorityFilter,
                categoryFilter
            )

        );

    };





    const handlePriority = (priority) => {


        setPriorityFilter(priority);


        setTasks(

            filterData(
                allTasks,
                statusFilter,
                priority,
                categoryFilter
            )

        );

    };





    const handleCategory = (category) => {


        setCategoryFilter(category);


        setTasks(

            filterData(
                allTasks,
                statusFilter,
                priorityFilter,
                category
            )

        );

    };





    const handleSearch = async () => {


        if (!keyword.trim()) {

            setTasks(
                filterData(allTasks)
            );

            return;

        }



        try {


            const response =
                await searchTasks(keyword);



            setTasks(

                filterData(response.data)

            );


        }
        catch (error) {

            console.log(error);

        }


    };





    const resetFilter = () => {


        setStatusFilter("ALL");

        setPriorityFilter("ALL");

        setCategoryFilter("ALL");

        setKeyword("");

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

                                        Thấp

                                    </option>


                                    <option value="MEDIUM">

                                        Trung bình

                                    </option>


                                    <option value="HIGH">

                                        Cao

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

                                        categories.map(category => (


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

                                    min="2000-01-01"

                                    max="2100-12-31"

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




                            <div className="search-box mb-3">


                                <Form.Control

                                    placeholder="Nhập tên công việc"

                                    value={keyword}

                                    onChange={
                                        e => setKeyword(e.target.value)
                                    }

                                />


                                <Button

                                    onClick={handleSearch}

                                >

                                    Tìm

                                </Button>


                            </div>





                            <div className="filter-line">


                                <strong>

                                    Trạng thái:

                                </strong>



                                <div className="filter-buttons">


                                    {

                                        ["ALL", "TODO", "DOING", "DONE"]

                                            .map(status => (


                                                <Button

                                                    key={status}

                                                    size="sm"

                                                    variant={
                                                        statusFilter === status
                                                            ?
                                                            "primary"
                                                            :
                                                            "outline-secondary"
                                                    }

                                                    onClick={() => handleStatus(status)}

                                                >


                                                    {convertStatus(status)}


                                                </Button>


                                            ))


                                    }


                                </div>


                            </div>





                            <div className="filter-line">


                                <strong>

                                    Mức ưu tiên:

                                </strong>


                                <div className="filter-buttons">


                                    {

                                        ["ALL", "LOW", "MEDIUM", "HIGH"]

                                            .map(priority => (


                                                <Button

                                                    key={priority}

                                                    size="sm"

                                                    variant={
                                                        priorityFilter === priority
                                                            ?
                                                            "primary"
                                                            :
                                                            "outline-secondary"
                                                    }

                                                    onClick={() => handlePriority(priority)}

                                                >


                                                    {convertPriority(priority)}


                                                </Button>


                                            ))


                                    }


                                </div>


                            </div>





                            <div className="filter-line">


                                <strong>

                                    Danh mục:

                                </strong>



                                <Form.Select

                                    className="category-filter"

                                    size="sm"

                                    value={categoryFilter}

                                    onChange={
                                        e => handleCategory(e.target.value)
                                    }

                                >


                                    <option value="ALL">

                                        Tất cả

                                    </option>



                                    {

                                        categories.map(category => (


                                            <option

                                                key={category.id}

                                                value={category.id}

                                            >

                                                {category.name}

                                            </option>


                                        ))

                                    }


                                </Form.Select>




                                <Button

                                    size="sm"

                                    variant="outline-secondary"

                                    onClick={resetFilter}

                                >

                                    Đặt lại

                                </Button>


                            </div>



                        </Card.Body>


                    </Card>





                    <Card className="shadow-sm task-table-card">


                        <Card.Body>


                            <h5>

                                Danh sách công việc

                            </h5>




                            <div className="table-responsive">


                                <table className="table table-hover align-middle task-table">


                                    <thead>


                                        <tr>

                                            <th>Tên</th>

                                            <th>Danh mục</th>

                                            <th>Trạng thái</th>

                                            <th>Mức ưu tiên</th>

                                            <th>Hạn hoàn thành</th>

                                            <th>Thao tác</th>

                                        </tr>


                                    </thead>




                                    <tbody>


                                        {

                                            tasks.length === 0


                                                ?

                                                <tr>

                                                    <td

                                                        colSpan="6"

                                                        className="text-center text-muted"

                                                    >

                                                        Không có công việc

                                                    </td>

                                                </tr>


                                                :


                                                tasks.map(task => (


                                                    <TaskCard

                                                        key={task.id}

                                                        task={task}

                                                        onChangeStatus={handleChangeStatus}

                                                        onEdit={handleEdit}

                                                        onDelete={handleDelete}

                                                    />


                                                ))


                                        }


                                    </tbody>


                                </table>


                            </div>



                        </Card.Body>


                    </Card>



                </Col>


            </Row>


        </div>


    );


}


export default Tasks;