import React from "react";
import logo from "../../assets/images/logo.png";
import { FaPhoneVolume, FaEnvelope } from "react-icons/fa6";
import SocialMedia from "./SocialMedia";
import WhatsAppCommunity from "./WhatsApp";


const Footer = () => {
  return (
    <footer className="py-5 text-white" style={{ backgroundColor: "#061123" }}>
      <div className="container">
        <div className="row g-4">
          {" "}
          {/* g-4 adds gap between columns on mobile */}
          <div className="col-md-3">
            <img src={logo} alt="logo" height={80} className="mb-3" />
            <div className="pt-2 opacity-75">
              One of the best recondition houses with a buyback guarantee in
              Nepal.
            </div>
            <SocialMedia />
          </div>
          <div className="col-md-3">
            <h3 className="mb-4 primary-text">Categories</h3>
            <ul className="list-unstyled">
              <li className="mb-2">
                <a href="/bikes" className="text-white-50 text-decoration-none">
                  Bikes
                </a>
              </li>
              <li className="mb-2">
                <a href="/cars" className="text-white-50 text-decoration-none">
                  Cars
                </a>
              </li>
              <li className="mb-2">
                <a
                  href="/accessories"
                  className="text-white-50 text-decoration-none"
                >
                  Accessories
                </a>
              </li>
            </ul>
          </div>
          <div className="col-md-3">
            <h3 className="mb-4 primary-text">Quick Links</h3>
            <ul className="list-unstyled">
              <li className="mb-2">
                <a href="/" className="text-white-50 text-decoration-none">
                  Home
                </a>
              </li>
              <li className="mb-2">
                <a href="/about" className="text-white-50 text-decoration-none">
                  About Us
                </a>
              </li>
              <li className="mb-2">
                <a
                  href="/contact"
                  className="text-white-50 text-decoration-none"
                >
                  Contact Us
                </a>
              </li>
              <li className="mb-2">
                <a
                  href="/privacy"
                  className="text-white-50 text-decoration-none"
                >
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>
          <div className="col-md-3">
            <h3 className="mb-4 primary-text">Get In Touch</h3>
            <ul className="list-unstyled">
              <li className="mb-3 d-flex align-items-center gap-2">
                <FaPhoneVolume className="primary-text" />
                <a
                  href="tel:+9779851090167"
                  className="text-white text-decoration-none"
                >
                  +977-9851090167
                </a>
              </li>
              <li className="mb-3 d-flex align-items-center gap-2">
                <FaEnvelope className="primary-text" />
                <a
                  href="mailto:blessauto@gmail.com"
                  className="text-white text-decoration-none"
                >
                  blessauto@gmail.com
                </a>
              </li>
              <WhatsAppCommunity />
              
              
            </ul>
          </div>
        </div>
        <div className="py-4 border-top border-secondary border-opacity-25 mt-5">
          <div className="container">
            <div className="d-flex flex-column flex-md-row justify-content-between align-items-center gap-2">
              {/* Left Side: Company Name */}
              <p className="small opacity-50 mb-0">
                &copy; 2010 - {new Date().getFullYear()} Bless Auto Enterprise.
                All Rights Reserved.
              </p>

              {/* Right Side: Developer Name (External Link) */}
              <p className="mb-0">
                <a
                  href="https://dangolprabin.com.np"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="small opacity-50 text-white text-decoration-none"
                >
                  Developed by{" "}
                  <span className="primary-text fw-bold">Prabin Dangol</span>
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
export default Footer;
