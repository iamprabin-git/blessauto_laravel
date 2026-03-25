import React from 'react';
import { Link } from "react-router-dom";
import { Row, Col, Card, Badge } from "react-bootstrap";

const RelatedProduct = ({ related }) => {
  // If the data hasn't loaded or is empty, don't show anything
  if (!related || related.length === 0) return null;

  return (
    <div className="mt-5 pt-5 border-top">
      <h4 className="fw-bold mb-4">Similar Vehicles</h4>
      <Row className="g-4">
        {related.map((item) => (
          <Col md={3} sm={6} key={item.id}>
            <Link to={`/product/${item.id}`} className="text-decoration-none">
              <Card className="border-0 shadow-sm rounded-4 overflow-hidden related-card h-100">
                <Card.Img src={item.image_url} style={{ height: '160px', objectFit: 'cover' }} />
                <Card.Body className="p-3">
                  <h6 className="fw-bold text-dark text-truncate mb-1">{item.title}</h6>
                  <div className="d-flex justify-content-between align-items-center">
                    <span className="primary-text fw-bold small">Rs. {Number(item.price).toLocaleString()}</span>
                    <Badge bg="light" className="text-muted border-0 fw-normal small">{item.model_year}</Badge>
                  </div>
                </Card.Body>
              </Card>
            </Link>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default RelatedProduct;