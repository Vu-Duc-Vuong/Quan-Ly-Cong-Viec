import React, { useState, useEffect } from 'react';
import { Table, Button, Form, Modal } from 'react-bootstrap';

export default function CategoryManager() {
  const [categories, setCategories] = useState([]);
  const [show, setShow] = useState(false);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    fetch('/api/categories')
      .then(res => res.json())
      .then(data => { if (data.success) setCategories(data.data); });
  }, []);

  const handleSave = () => {
    fetch('/api/categories', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, description })
    })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setCategories([...categories, data.data]);
          setShow(false);
          setName('');
          setDescription('');
        }
      });
  };

  return (
    <div className="p-4 bg-white rounded shadow-sm">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h4>Quản lý danh mục</h4>
        <Button variant="primary" onClick={() => setShow(true)}>Thêm danh mục</Button>
      </div>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Tên danh mục</th>
            <th>Mô tả</th>
            <th>Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((cat, idx) => (
            <tr key={cat.id}>
              <td>{idx + 1}</td>
              <td>{cat.name}</td>
              <td>{cat.description}</td>
              <td>
                <Button size="sm" variant="warning" className="me-2">Sửa</Button>
                <Button size="sm" variant="danger">Xóa</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Modal thêm danh mục */}
      <Modal show={show} onHide={() => setShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Thêm danh mục mới</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="mb-3">
            <Form.Label>Tên danh mục</Form.Label>
            <Form.Control type="text" value={name} onChange={e => setName(e.target.value)} placeholder="Nhập tên..." />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Mô tả</Form.Label>
            <Form.Control as="textarea" rows={3} value={description} onChange={e => setDescription(e.target.value)} placeholder="Nhập mô tả..." />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShow(false)}>Hủy</Button>
          <Button variant="primary" onClick={handleSave}>Lưu</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}