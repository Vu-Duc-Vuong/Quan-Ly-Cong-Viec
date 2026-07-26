import React, { useState, useEffect } from 'react';
import { Row, Col, Card } from 'react-bootstrap';

export default function StatisticsSummary() {
  const [stats, setStats] = useState({ totalTasks: 0, dueTodayTasks: 0, overdueTasks: 0, completedTasks: 0 });

  useEffect(() => {
    fetch('/api/statistics/summary')
      .then(res => res.json())
      .then(data => { if (data.success) setStats(data.data); });
  }, []);

  return (
    <Row className="mb-4">
      <Col md={3}>
        <Card className="text-center shadow-sm p-2">
          <Card.Body>
            <Card.Title className="text-muted fs-6">Tổng số</Card.Title>
            <h3>{stats.totalTasks}</h3>
          </Card.Body>
        </Card>
      </Col>
      <Col md={3}>
        <Card className="text-center shadow-sm p-2">
          <Card.Body>
            <Card.Title className="text-muted fs-6">Đến hạn hôm nay</Card.Title>
            <h3 className="text-warning">{stats.dueTodayTasks}</h3>
          </Card.Body>
        </Card>
      </Col>
      <Col md={3}>
        <Card className="text-center shadow-sm p-2">
          <Card.Body>
            <Card.Title className="text-muted fs-6">Quá hạn</Card.Title>
            <h3 className="text-danger">{stats.overdueTasks}</h3>
          </Card.Body>
        </Card>
      </Col>
      <Col md={3}>
        <Card className="text-center shadow-sm p-2">
          <Card.Body>
            <Card.Title className="text-muted fs-6">Đã hoàn thành</Card.Title>
            <h3 className="text-success">{stats.completedTasks}</h3>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
}