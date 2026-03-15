import React from 'react';
import { FaFacebookF, FaInstagram, FaYoutube, FaWhatsapp } from "react-icons/fa6";

const SocialMedia = () => {
  const socials = [
    { id: 1, icon: <FaFacebookF />, link: "https://facebook.com", color: "#1877F2" },
    { id: 2, icon: <FaInstagram />, link: "https://instagram.com", color: "#E4405F" },
    { id: 3, icon: <FaYoutube />, link: "https://youtube.com", color: "#FF0000" },
    { id: 4, icon: <FaWhatsapp />, link: "https://wa.me/9779851090167", color: "#25D366" },
  ];

  return (
    <div className="d-flex gap-3 mt-3">
      {socials.map((social) => (
        <a
          key={social.id}
          href={social.link}
          target="_blank"
          rel="noopener noreferrer"
          className="social-icon-box d-flex align-items-center justify-content-center text-white text-decoration-none"
          style={{ 
            width: "36px", 
            height: "36px", 
            borderRadius: "50%", 
            backgroundColor: "rgba(255,255,255,0.1)",
            transition: "0.3s ease"
          }}
        >
          {social.icon}
        </a>
      ))}
    </div>
  );
};

export default SocialMedia;