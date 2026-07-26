import React, { useState } from 'react';
import { Form, Row, Col, Button } from 'react-bootstrap';

export default function TaskSearchFilter({ onSearch, onFilter }) {
  const [keyword, setKeyword] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [status, setStatus] = useState('');

  const handleSearchChange = (e) => {
    setKeyword(e.target.value);
    onSearch(e.target.value);
  };

  const handleCategoryChange = (e) => {
    setCategoryId(e.target.value);
    onFilter({ categoryId: e.target.value, status });
  };

  const handleStatusChange = (e) => {
    setStatus(e.target.value);
    onFilter({ categoryId, status: e.target.value });
  };

  return (
    <Form className="p-3 bg-white rounded shadow-sm mb-4">
      <Row className="g-3">
        <Col md={6}>
          <Form.Control
            type="text"
            placeholder="Tìm kiếm công việc theo từ khóa..."
            value={keyword}
            onChange={handleSearchChange}
          />
        </Col>
        <Col md={3}>
          <Form.Select value={categoryId} onChange={handleCategoryChange}>
            <option value="">Lọc theo danh mục</option>
            <option value="1">Công việc cá nhân</option>
            <option value="2">Công việc công ty</option>
          </Form.Select>
        </Col>
        <Col md={3}>
          <Form.Select value={status} onChange={handleStatusChange}>
            <option value="">Lọc theo trạng thái</option>
            <option value="TODO">Chưa làm (TODO)</option>
            <option value="DOING">Đang làm (DOING)</option>
            <option value="DONE">Hoàn thành (DONE)</option>
          </Form.Select>
        </Col>
      </Row>
    </Form>
  );
}