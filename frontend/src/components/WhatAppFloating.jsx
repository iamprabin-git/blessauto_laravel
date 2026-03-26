import React from 'react';
import { FaWhatsapp } from "react-icons/fa";

const WhatsAppFloating = () => {
  const phoneNumber = "9779851090167";
  const message = encodeURIComponent("Hello Bless Auto! I'm interested in your services.");
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;

  return (
    <>
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="position-fixed bottom-0 end-0 m-4 shadow-lg d-flex align-items-center justify-content-center border-0"
        style={{
          width: '60px',
          height: '60px',
          backgroundColor: '#25D366',
          color: '#fff',
          borderRadius: '50%',
          zIndex: 9999,
          textDecoration: 'none'
        }}
      >
        <FaWhatsapp size={32} />
      </a>

      <style>{`
        .position-fixed { transition: transform 0.2s ease; }
        .position-fixed:hover { transform: scale(1.1); }
      `}</style>
    </>
  );
};

export default WhatsAppFloating;