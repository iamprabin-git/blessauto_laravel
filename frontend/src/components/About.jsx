import React from 'react';
import Layout from './common/Layout';
import { Container, Row, Col, Card } from 'react-bootstrap';
// Replaced 'Tool' with 'Wrench' to fix the SyntaxError
import { ShieldCheck, Wrench, Clock, Award } from 'lucide-react';

const About = () => {
  const stats = [
    { 
      icon: <Wrench size={32}/>, 
      title: "Expert Reconditioning", 
      desc: "Every bike and car undergoes a rigorous multi-point check." 
    },
    { 
      icon: <ShieldCheck size={32}/>, 
      title: "Verified History", 
      desc: "Transparent ownership and mileage records for every vehicle." 
    },
    { 
      icon: <Clock size={32}/>, 
      title: "Quick Processing", 
      desc: "From viewing to ownership in record time." 
    },
    { 
      icon: <Award size={32}/>, 
      title: "Quality Assured", 
      desc: "We specialize in bringing vehicles back to showroom condition." 
    }
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <div className="bg-light py-5">
        <Container>
          <Row className="align-items-center g-5">
            <Col lg={6}>
              <h1 className="fw-bold mb-4">
                Redefining the Used <span className="text-info">Vehicle Market</span>
              </h1>
              <p className="lead text-muted">
                Welcome to <strong>Bless Auto Enterprises</strong>. Based in West Bromwich, we are dedicated to providing high-quality, reconditioned bikes and cars.
              </p>
              <p className="text-muted">
                Our journey started with a passion for automotive excellence. We don't just sell vehicles; we ensure each one meets a standard of safety and performance that gives our customers peace of mind.
              </p>
            </Col>
            <Col lg={6}>
              {/* Ensure this image path exists in your /public/images folder */}
              <img 
                src="/images/about-hero.jpg" 
                alt="Bless Auto Workshop" 
                className="img-fluid rounded-4 shadow" 
              />
            </Col>
          </Row>
        </Container>
      </div>

      {/* Stats/Features Grid */}
      <Container className="py-5">
        <Row className="g-4">
          {stats.map((item, i) => (
            <Col md={6} lg={3} key={i}>
              <Card className="border-0 shadow-sm text-center p-4 h-100 rounded-4 transition-hover">
                <div className="text-info mb-3 d-flex justify-content-center">
                  {item.icon}
                </div>
                <h6 className="fw-bold">{item.title}</h6>
                <p className="small text-muted mb-0">{item.desc}</p>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </Layout>
  );
};

export default About;