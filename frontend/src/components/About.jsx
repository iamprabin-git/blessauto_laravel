import React from 'react';
import { ShieldCheck, Wrench, Car, Award } from 'lucide-react';
import Layout from './common/Layout';
import { Link } from 'react-router-dom';

const AboutUs = () => {
  return (
    <Layout className="about-page">
      {/* Hero Section with Glassmorphism */}
      <section 
        className="position-relative d-flex align-items-center justify-content-center text-white text-center" 
        style={{ 
          minHeight: '60vh',
          backgroundImage: 'url("https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?auto=format&fit=crop&q=80&w=1600")', 
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <div className="position-absolute top-0 start-0 w-100 h-100 bg-black opacity-50"></div>
        
        {/* Glass Box */}
        <div className="position-relative z-index-1 p-5 rounded-4" style={{
          background: 'rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          maxWidth: '800px'
        }}>
          <h1 className="display-3 fw-bold mb-3">Bless Auto Enterprise</h1>
          <p className="fs-4 fw-light">Redefining the Reconditioned Vehicle Market in lalitpur, Nepal</p>
        </div>
      </section>

      <div className="container py-5">
        {/* Story Section */}
        <div className="row align-items-center mb-5 py-5">
          <div className="col-lg-6 mb-4 mb-lg-0">
            <h2 className="display-5 fw-bold mb-4">Quality You Can Trust</h2>
            <p className="lead text-secondary">
              At <strong>Bless Auto Enterprise Pvt. Ltd.</strong>, we understand that a vehicle is more than just a 
              mode of transport—it's an investment in your daily life.
            </p>
            <p className="text-muted">
              Based in the heart of West Bromwich, we specialize in the meticulous reconditioning of both cars and bikes. 
              Our journey started with a simple mission: to bridge the gap between "used" and "new." 
              Every vehicle in our inventory undergoes a rigorous multi-point inspection to ensure it meets the 
              highest safety and performance standards.
            </p>
          </div>
          <div className="col-lg-6">
            <div className="position-relative">
              <img 
                src="https://images.unsplash.com/photo-1517524204412-1d906b8d010e?auto=format&fit=crop&q=80&w=800" 
                alt="Workshop Reconditioning" 
                className="img-fluid rounded-4 shadow-lg" 
              />
              <div className="position-absolute bottom-0 start-0 bg-primary text-white p-3 rounded-end shadow-sm d-none d-md-block" style={{ transform: 'translate(-20px, -20px)' }}>
                <span className="h4 fw-bold mb-0">100%</span>
                <p className="small mb-0">Certified Inspections</p>
              </div>
            </div>
          </div>
        </div>

        {/* Features / Values Grid */}
        <div className="row g-4 py-5 border-top">
          <div className="col-md-3 text-center">
            <div className="p-4 h-100 border rounded-4 hover-shadow transition">
              <ShieldCheck size={48} className="text-primary mb-3" />
              <h5 className="fw-bold">Transparency</h5>
              <p className="small text-muted">Clear histories, verified mileage, and honest pricing on every vehicle.</p>
            </div>
          </div>
          <div className="col-md-3 text-center">
            <div className="p-4 h-100 border rounded-4 hover-shadow transition">
              <Wrench size={48} className="text-primary mb-3" />
              <h5 className="fw-bold">Expert Care</h5>
              <p className="small text-muted">Our technicians bring years of expertise to the reconditioning process.</p>
            </div>
          </div>
          <div className="col-md-3 text-center">
            <div className="p-4 h-100 border rounded-4 hover-shadow transition">
              <Car size={48} className="text-primary mb-3" />
              <h5 className="fw-bold">Wide Range</h5>
              <p className="small text-muted">From fuel-efficient city cars to high-performance reconditioned bikes.</p>
            </div>
          </div>
          <div className="col-md-3 text-center">
            <div className="p-4 h-100 border rounded-4 hover-shadow transition">
              <Award size={48} className="text-primary mb-3" />
              <h5 className="fw-bold">Local Pride</h5>
              <p className="small text-muted">A business dedicated to serving the West Bromwich and UK community.</p>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="bg-dark text-white p-5 rounded-4 my-5 text-center shadow-lg">
          <h2 className="display-6 fw-bold mb-3">Ready to find your next ride?</h2>
          <p className="mb-4 opacity-75">Explore our latest inventory of reconditioned cars and bikes today.</p>
          <div className="d-flex justify-content-center flex-wrap gap-3">
            <Link to="/shop" className="btn btn-primary btn-lg px-4 py-2 fw-bold">Browse Inventory</Link>
            <Link to="/contact" className="btn btn-outline-light btn-lg px-4 py-2">Contact Us</Link>
          </div>
        </div>
      </div>

      <style>{`
        .hover-shadow:hover {
          box-shadow: 0 10px 20px rgba(0,0,0,0.1);
          border-color: #0d6efd !important;
        }
        .transition {
          transition: all 0.3s ease;
        }
      `}</style>
    </Layout>
  );
};

export default AboutUs;