import React from 'react';
import { ShieldCheck, Wrench, Car, FileSignature, CheckCircle2, Home } from 'lucide-react';
import { motion } from 'framer-motion'; 
import Layout from './common/Layout';
import { Link, useNavigate } from 'react-router-dom';
import keyImage from '../assets/images/key.png';
// Local image imports are now correctly used below
import service1 from '../assets/images/billbook.webp';
import service2 from '../assets/images/legal.jpg';
import service3 from '../assets/images/recond.jpg';


const AboutUs = () => {
  const navigate = useNavigate();

  const reasons = [
    { title: "Trusted since 2010", desc: "Over 16 years of experience in the Nepalese automotive market." },
    { title: "Expert Reconditioning", desc: "Every vehicle is restored to factory standards by specialists." },
    { title: "Legal Peace of Mind", desc: "Full support for Billbook renewals and ownership transfers." },
    { title: "BuyBack Guarantee", desc: "We offer a 100% BuyBack Guarantee after years of use at reasonable prices." }
  ];

  const services = [
    { 
      title: "Billbook Renewal", 
      desc: "Hassle-free tax payments and document renewals.", 
      icon: <FileSignature size={30} />,
      // FIX: Using the imported local asset
      image: service1 
    },
    { 
      title: "Bike Transfer", 
      desc: "Professional handling of legal ownership transfers.", 
      icon: <Wrench size={30} />,
      // FIX: Using the imported local asset
      image: service2 
    },
    { 
      title: "Reconditioning", 
      desc: "Premium restoration for bikes and cars.", 
      icon: <Car size={30} />,
      // FIX: Using the imported local asset
      image: service3 
    }
  ];

  return (
    <Layout>
      {/* 1. Breadcrumb */}
      <div className="bg-light border-bottom">
        <div className="container py-2">
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb mb-0 small">
              <li className="breadcrumb-item">
                <Link to="/" className="text-decoration-none text-muted d-flex align-items-center">
                  <Home size={14} className="me-1" /> Home
                </Link>
              </li>
              <li className="breadcrumb-item active fw-bold text-dark">About us</li>
            </ol>
          </nav>
        </div>
      </div>

      {/* 2. Hero Section */}
      <section className="position-relative bg-dark text-white d-flex align-items-center" style={{ minHeight: '400px' }}>
        <div className="position-absolute top-0 start-0 w-100 h-100" style={{ zIndex: 1, background: 'linear-gradient(90deg, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.3) 100%)' }}></div>
        <img 
          src="https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&q=80&w=1600" 
          className="position-absolute top-0 start-0 w-100 h-100" 
          style={{ objectFit: 'cover', zIndex: 0 }} 
          alt="Bless Auto Showroom" 
        />
        <div className="container position-relative" style={{ zIndex: 2 }}>
          <div className="col-lg-8">
            <h1 className="display-3 fw-bold mb-3">About Bless Auto</h1>
            <p className="fs-4 fw-light opacity-90">Nepal's trusted destination for quality reconditioned vehicles and expert legal support since 2010 AD.</p>
          </div>
        </div>
      </section>

      {/* 3. Story Section */}
      <section className="py-5 bg-white">
        <div className="container py-4">
          <div className="row align-items-center g-5">
            <div className="col-lg-6">
              <h2 className="display-5 fw-bold mb-4">Our <span className="text-primary">Journey</span></h2>
              <p className="lead text-dark mb-4">Founded in 2010 AD in Lalitpur, we began with a mission to redefine the used vehicle market through trust and reliability.</p>
              <p className="text-secondary mb-4">
                We have evolved into a full-service automotive hub. Whether it is a meticulous 
                mechanical overhaul or the complex legalities of **Billbook renewals** and **Name transfers**, 
                our team handles everything under one roof, ensuring a seamless experience for every rider.
              </p>
              <div className="row g-3">
                {['16+ Years Experience', 'Lalitpur Headquarters', 'Certified Specialists', '100% Legal Guarantee'].map((text, i) => (
                  <div key={i} className="col-md-6 d-flex align-items-center">
                    <CheckCircle2 className="text-primary me-2" size={20} />
                    <span className="fw-bold text-dark small">{text}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="col-lg-6">
              <motion.img 
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                src={keyImage} 
                className="img-fluid rounded-4 shadow-lg" 
                alt="Ownership Handover" 
              />
            </div>
          </div>
        </div>
      </section>

      {/* 4. Service Columns with Images - Redirects to Contact */}
      <section className="py-5 bg-light">
        <div className="container py-4">
          <div className="text-center mb-5">
            <h2 className="fw-bold display-6">Specialized <span className="text-primary">Solutions</span></h2>
            <p className="text-muted">Expert services designed to keep you on the road</p>
          </div>
          <div className="row g-4">
            {services.map((s, i) => (
              <div key={i} className="col-lg-4 col-md-6">
                <motion.div 
                  whileHover={{ y: -10 }}
                  className="card h-100 border-0 shadow-sm overflow-hidden rounded-4"
                >
                  <div style={{ height: '200px', overflow: 'hidden' }}>
                    <img src={s.image} className="w-100 h-100" style={{ objectFit: 'cover' }} alt={s.title} />
                  </div>
                  <div className="card-body p-4">
                    <div className="d-flex align-items-center mb-3">
                      <div className="text-primary me-3">{s.icon}</div>
                      <h4 className="fw-bold mb-0">{s.title}</h4>
                    </div>
                    <p className="text-muted small mb-4">{s.desc}</p>
                    <button 
                      onClick={() => navigate('/contact')} 
                      className="btn btn-outline-primary w-100 rounded-pill fw-bold"
                    >
                      Enquire for {s.title}
                    </button>
                  </div>
                </motion.div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Why Choose Us / BuyBack Guarantee */}
      <section className="py-5 bg-white border-top">
        <div className="container py-4">
          <h2 className="text-center fw-bold mb-5">Why Choose Bless Auto?</h2>
          <div className="row g-4">
            {reasons.map((r, i) => (
              <div key={i} className="col-md-3 text-center">
                <div className="mb-3 d-inline-block p-3 bg-light rounded-circle text-primary">
                  <ShieldCheck size={32} />
                </div>
                <h6 className="fw-bold">{r.title}</h6>
                <p className="small text-muted px-2">{r.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-5">
        <div className="container">
          <div className="bg-primary rounded-5 p-5 text-center text-white shadow-lg">
            <h2 className="fw-bold mb-3">Ready to Start Your Journey?</h2>
            <p className="mb-4 opacity-75">Contact our team in Lalitpur today for vehicle sales or legal support.</p>
            <Link to="/contact" className="btn btn-light btn-lg px-5 rounded-pill fw-bold text-primary">
              Contact Us Now
            </Link>
          </div>
        </div>
      </section>

      <style>{`
        .breadcrumb-item + .breadcrumb-item::before { content: ">"; color: #adb5bd; }
        .btn-outline-primary:hover { color: #fff; background-color: #0d6efd; }
        .card { transition: all 0.3s ease; }
      `}</style>
    </Layout>
  );
};

export default AboutUs;