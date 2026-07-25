import { Nav } from "react-bootstrap";
import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <div
      className="bg-dark text-white p-3"
      style={{ minHeight: "100vh" }}
    >

      <h3 className="text-center mb-4">
        Manager
      </h3>


      <Nav className="flex-column">

        <Nav.Link
          as={Link}
          to="/"
          className="text-white"
        >
          Trang chủ
        </Nav.Link>


        <Nav.Link
          as={Link}
          to="/statistics"
          className="text-white"
        >
          Thống kê
        </Nav.Link>


        <Nav.Link
          as={Link}
          to="/tasks"
          className="text-white"
        >
          Công việc
        </Nav.Link>


        <Nav.Link
          as={Link}
          to="/categories"
          className="text-white"
        >
          Danh mục
        </Nav.Link>


        <Nav.Link
          as={Link}
          to="/calendar"
          className="text-white"
        >
          Lịch làm việc
        </Nav.Link>


      </Nav>

    </div>
  );
}

export default Sidebar;