import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, ShieldCheck, Clock, CheckCircle2, Home } from 'lucide-react';
import { motion } from 'framer-motion';
import Layout from './common/Layout';
import { Link } from 'react-router-dom';
import contactImage from '../assets/images/contactus.jpg';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: 'Billbook Renewal',
    vehicleNumber: '',
    message: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const whatsappMsg = `Hello Bless Auto, my name is ${formData.name} (${formData.email}). I am interested in ${formData.service}. ${formData.vehicleNumber ? 'Vehicle: ' + formData.vehicleNumber : ''}. Message: ${formData.message}`;
    window.open(`https://wa.me/9779851090167?text=${encodeURIComponent(whatsappMsg)}`, '_blank');
  };

  return (
    <Layout>
      {/* 1. Breadcrumb Navigation */}
      <div className="bg-light border-bottom">
        <div className="container py-2">
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb mb-0 small">
              <li className="breadcrumb-item">
                <Link to="/" className="text-decoration-none text-muted d-flex align-items-center">
                  <Home size={14} className="me-1" /> Home
                </Link>
              </li>
              <li className="breadcrumb-item active fw-bold text-dark" aria-current="page">Contact us</li>
            </ol>
          </nav>
        </div>
      </div>

      {/* 2. Hero Header with Background Image */}
      <section className="position-relative bg-dark text-white py-5 overflow-hidden" style={{ minHeight: '300px' }}>
        {/* Image Overlay */}
        <div className="position-absolute top-0 start-0 w-100 h-100" style={{ zIndex: 1, background: 'linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7))' }}></div>
        <img 
          src={contactImage} 
          className="position-absolute top-0 start-0 w-100 h-100" 
          style={{ objectFit: 'cover', zIndex: 0 }} 
          alt="Contact Bless Auto" 
        />
        
        <div className="container position-relative text-center py-5" style={{ zIndex: 2 }}>
          <motion.h1 
            initial={{ opacity: 0, y: -20 }} 
            animate={{ opacity: 1, y: 0 }} 
            className="display-4 fw-bold"
          >
            Contact <span className="text-primary">Bless Auto</span>
          </motion.h1>
          <p className="lead opacity-75">Your trusted automotive partner in Lalitpur since 2010.</p>
        </div>
      </section>

      <section className="py-5 bg-light">
        <div className="container">
          <div className="row g-5">
            
            {/* 3. Left Column: Detailed Contact Info */}
            <div className="col-lg-5">
              <div className="pe-lg-4">
                <h2 className="fw-bold mb-4">Get in touch</h2>
                
                <div className="contact-info-card bg-white p-4 rounded-4 shadow-sm mb-4">
                  <div className="d-flex align-items-start mb-4">
                    <div className="text-primary me-3"><MapPin size={24} /></div>
                    <div>
                      <h6 className="fw-bold mb-1">Visit Our Showroom</h6>
                      <p className="text-muted small mb-0">Lalitpur, Nepal (Satdobato Dobato)</p>
                    </div>
                  </div>

                  <div className="d-flex align-items-start mb-4">
                    <div className="text-primary me-3"><Phone size={24} /></div>
                    <div>
                      <h6 className="fw-bold mb-1">Call Us</h6>
                      <p className="text-muted small mb-0">+977-9851090167<br/>+977-9801090167</p>
                    </div>
                  </div>

                  <div className="d-flex align-items-start mb-0">
                    <div className="text-primary me-3"><Mail size={24} /></div>
                    <div>
                      <h6 className="fw-bold mb-1">Email Us</h6>
                      <p className="text-muted small mb-0">info@blessauto.com.np<br/>support@blessauto.com.np</p>
                    </div>
                  </div>
                </div>

                <div className="bg-primary text-white p-4 rounded-4 shadow-lg">
                  <h5 className="fw-bold mb-3 d-flex align-items-center"><ShieldCheck className="me-2" /> Quick Support</h5>
                  <p className="small opacity-90 mb-0">Our team typically responds to inquiries within 2 hours during business hours.<br/>(Sun-Fri, 9am-5pm)</p>
                </div>
              </div>
            </div>

            {/* 4. Right Column: The Form */}
            <div className="col-lg-7">
              <motion.div 
                initial={{ opacity: 0, x: 20 }} 
                animate={{ opacity: 1, x: 0 }}
                className="card border-0 shadow-lg rounded-5 p-4 p-md-5 bg-white"
              >
                <form onSubmit={handleSubmit}>
                  <div className="row g-3">
                    <div className="col-md-6 mb-3">
                      <label className="form-label fw-bold small">Full Name</label>
                      <input type="text" className="form-control form-control-lg rounded-3 bg-light border-0 fs-6" placeholder="Your Name" required onChange={(e) => setFormData({...formData, name: e.target.value})} />
                    </div>
                    <div className="col-md-6 mb-3">
                      <label className="form-label fw-bold small">Email Address</label>
                      <input type="email" className="form-control form-control-lg rounded-3 bg-light border-0 fs-6" placeholder="email@example.com" required onChange={(e) => setFormData({...formData, email: e.target.value})} />
                    </div>
                  </div>

                  <div className="row g-3">
                    <div className="col-md-6 mb-3">
                      <label className="form-label fw-bold small">Phone Number</label>
                      <input type="tel" className="form-control form-control-lg rounded-3 bg-light border-0 fs-6" placeholder="98XXXXXXXX" required onChange={(e) => setFormData({...formData, phone: e.target.value})} />
                    </div>
                    <div className="col-md-6 mb-3">
                      <label className="form-label fw-bold small">Service Type</label>
                      <select className="form-select form-select-lg rounded-3 bg-light border-0 text-muted fs-6" onChange={(e) => setFormData({...formData, service: e.target.value})}>
                        <option value="Billbook Renewal">Billbook Renewal</option>
                        <option value="Insurance Renewal">Insurance Renewal</option>
                        <option value="Legal & Transfer">Legal & Transfer Work</option>
                        <option value="Reconditioning">Vehicle Reconditioning</option>
                      </select>
                    </div>
                  </div>

                  {(formData.service === "Billbook Renewal" || formData.service === "Insurance Renewal") && (
                    <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-3">
                      <label className="form-label fw-bold small">Vehicle Number</label>
                      <input type="text" className="form-control form-control-lg rounded-3 border-primary-subtle" placeholder="e.g. Ba 2 Pa 1234" onChange={(e) => setFormData({...formData, vehicleNumber: e.target.value})} />
                    </motion.div>
                  )}

                  <div className="mb-4">
                    <label className="form-label fw-bold small">Your Message</label>
                    <textarea className="form-control rounded-3 bg-light border-0 fs-6" rows="4" placeholder="How can we help you today?" onChange={(e) => setFormData({...formData, message: e.target.value})}></textarea>
                  </div>

                  <button type="submit" className="btn btn-primary btn-lg w-100 rounded-pill fw-bold shadow">
                    Send Inquiry <Send size={18} className="ms-2" />
                  </button>
                </form>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Google Map Section */}
      <section className="bg-white">
        <div className="container-fluid p-0">
          <div style={{ width: '100%', height: '450px' }}>
            <iframe 
              title="Bless Auto Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3534.123456789!2d85.330!3d27.658!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb19cf2c0b551b%3A0x6d900407a97269!2sSatdobato%2C%20Lalitpur!5e0!3m2!1sen!2snp!4v1648000000000!5m2!1sen!2snp" 
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen="" 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
            >
            </iframe>
          </div>
        </div>
      </section>

      <style>{`
        .breadcrumb-item + .breadcrumb-item::before { content: ">"; color: #adb5bd; }
        .contact-info-card { border: 1px solid #eee; }
        .form-control:focus, .form-select:focus {
          background-color: #fff !important;
          border: 1px solid #0d6efd !important;
          box-shadow: 0 0 0 0.25rem rgba(13, 110, 253, 0.1);
        }
      `}</style>
    </Layout>
  );
};

export default Contact;