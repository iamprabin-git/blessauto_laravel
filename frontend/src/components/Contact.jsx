import React, { useState } from 'react';
import Layout from './common/Layout';
import { Container, Row, Col, Form, Button, Card } from 'react-bootstrap';
import { Mail, Phone, MapPin } from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Lead captured:", formData);
    alert("Thank you! Our team will contact you shortly.");
  };

  return (
    <Layout>
      <Container className="py-5">
        <Row className="g-5">
          <Col lg={5}>
            <h2 className="fw-bold mb-4">Get In Touch</h2>
            <p className="text-muted mb-5">Have questions about a specific vehicle or our reconditioning process? Reach out to us directly.</p>
            
            <div className="d-flex mb-4">
              <div className="bg-info text-white p-3 rounded-3 me-3"><MapPin /></div>
              <div>
                <h6 className="fw-bold mb-1">Our Location</h6>
                <p className="text-muted">West Bromwich, B70 8BP</p>
              </div>
            </div>

            <div className="d-flex mb-4">
              <div className="bg-info text-white p-3 rounded-3 me-3"><Phone /></div>
              <div>
                <h6 className="fw-bold mb-1">Call Us</h6>
                <p className="text-muted">+44 7XXX XXXXXX</p>
              </div>
            </div>
          </Col>

          <Col lg={7}>
            <Card className="border-0 shadow-sm p-4 rounded-4">
              <Form onSubmit={handleSubmit}>
                <Row>
                  <Col md={6} className="mb-3">
                    <Form.Label className="small fw-bold">Full Name</Form.Label>
                    <Form.Control type="text" placeholder="John Doe" required 
                      onChange={(e) => setFormData({...formData, name: e.target.value})} />
                  </Col>
                  <Col md={6} className="mb-3">
                    <Form.Label className="small fw-bold">Email Address</Form.Label>
                    <Form.Control type="email" placeholder="name@example.com" required 
                      onChange={(e) => setFormData({...formData, email: e.target.value})} />
                  </Col>
                </Row>
                <Form.Group className="mb-4">
                  <Form.Label className="small fw-bold">Message</Form.Label>
                  <Form.Control as="textarea" rows={4} placeholder="How can we help?" 
                    onChange={(e) => setFormData({...formData, message: e.target.value})} />
                </Form.Group>
                <Button variant="primary" type="submit" className="px-5 py-2 fw-bold border-0 shadow-sm">
                  Send Message
                </Button>
              </Form>
            </Card>
          </Col>
        </Row>
      </Container>
    </Layout>
  );
};

export default Contact;