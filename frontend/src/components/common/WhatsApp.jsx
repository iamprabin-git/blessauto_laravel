import React from 'react';
// Import the missing icons here
import { FaWhatsapp, FaArrowRight } from "react-icons/fa6";

const WhatsApp = () => {
  return (
    <div className="container">
      <h3 className="mb-4 primary-text">Whats App Community</h3>
      <div 
        className="p-3 rounded-3 d-flex flex-column gap-3" 
        style={{ backgroundColor: "rgba(37, 211, 102, 0.1)", border: "1px solid rgba(37, 211, 102, 0.2)" }}
      >
        <div className="d-flex align-items-center gap-2">
          <FaWhatsapp className="fs-4" style={{ color: "#25D366" }} />
          <span className="fw-bold small text-white">WhatsApp Group</span>
        </div>
        
        <p className="small mb-0 text-white-50">
          Join our community for daily updates on bike arrivals & buyback deals.
        </p>

        <a 
          href="https://chat.whatsapp.com/YOUR_LINK_HERE" 
          target="_blank" 
          rel="noopener noreferrer"
          className="btn btn-sm w-100 fw-bold d-flex align-items-center justify-content-center gap-2"
          style={{ backgroundColor: "#25D366", color: "#fff", border: "none" }}
        >
          JOIN COMMUNITY <FaArrowRight size={12} />
        </a>
      </div>
    </div>
  );
};

export default WhatsApp;