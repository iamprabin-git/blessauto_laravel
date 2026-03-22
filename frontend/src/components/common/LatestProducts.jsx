import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { apiUrl } from "../common/http";
import {
  FaGasPump, FaRoad, FaCalendarAlt, FaCogs,
  FaPlusCircle, FaTimes, FaCheckCircle, FaPalette, FaFileContract, FaClock
} from "react-icons/fa";

const LatestProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedSpecs, setSelectedSpecs] = useState(null);
  const [activeTab, setActiveTab] = useState('specs');
  const navigate = useNavigate();

  // 1. Fetch Latest Products (Assuming endpoint: /get-latest-products)
  const getLatestProducts = useCallback(async () => {
    try {
      const res = await fetch(`${apiUrl}/get-latest-products`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
      });
      const result = await res.json();
      if (result.status === 200) {
        setProducts(result.data);
      }
    } catch (error) {
      console.error("Error fetching latest products:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    getLatestProducts();
  }, [getLatestProducts]);

  if (loading) {
    return (
      <div className="text-center py-5">
        <div className="spinner-border text-info" role="status"></div>
        <p className="mt-2 text-muted">Fetching new arrivals...</p>
      </div>
    );
  }

  return (
    <section className="section-latest py-4 py-md-5">
      <div className="container">
        <div className="d-flex align-items-center justify-content-between mb-4 px-2">
          <h2 className="fw-bold mb-0">New Arrivals</h2>
          <span className="badge bg-info-subtle text-info border border-info px-3 py-2 rounded-pill">
            <FaClock className="me-1" /> Just Added
          </span>
        </div>

        <div className="row g-3 g-md-4">
          {products.map((product) => {
            const currentPrice = Number(product.price);
            const discountAmount = Number(product.discount_price || 0);
            const originalPrice = currentPrice + discountAmount;
            const hasDiscount = discountAmount > 0;

            return (
              <div className="col-lg-3 col-md-4 col-6" key={product.id}>
                <div className="card h-100 border-0 shadow-sm hover-up position-relative overflow-hidden bg-white">
                  
                  {/* CONDITION RIBBON */}
                  <div className="ribbon-wrapper">
                    <div className={`ribbon ${product.condition.toLowerCase().replace(/\s+/g, "-")}`}>
                      {product.condition}
                    </div>
                  </div>

                  {/* IMAGE SECTION */}
                  <div 
                    className="card-img-wrapper cursor-pointer" 
                    style={{ height: "160px", overflow: "hidden" }}
                    onClick={() => navigate(`/product/${product.id}`)}
                  >
                    <img 
                      src={product.image_url} 
                      alt={product.title} 
                      className="card-img-top w-100 h-100 object-fit-cover transition-transform"
                      onError={(e) => { e.target.src = "https://placehold.co/400x300?text=New+Arrival"; }}
                    />
                  </div>

                  {/* DETAILS SECTION */}
                  <div className="card-body p-2 p-md-3 d-flex flex-column">
                    <div className="d-flex justify-content-between align-items-start mb-2">
                      <h2
                        className="card-title fw-bold text-dark text-capitalize text-truncate mb-0"
                        style={{ fontSize: "1 rem" }}
                      >
                        {product.title}
                      </h2>
                      <span className="badge bg-light text-primary border border-primary-light x-small">
                        {product.ownership_number}
                        {product.ownership_number === 1 ? "st" : "nd"} Owner
                      </span>
                   </div>

                    <div className="mb-3">
                      <div className="d-flex flex-wrap align-items-baseline gap-1">
                        <span className="fw-bold text-success h5 mb-0">
                          Rs. {currentPrice.toLocaleString()}
                        </span>
                        {hasDiscount && (
                          <span className="text-decoration-line-through text-muted x-small">
                            Rs. {originalPrice.toLocaleString()}
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="mt-auto">
                      <button 
                        className="btn btn-sm btn-dark w-100 d-flex align-items-center justify-content-center gap-2 py-2 rounded-3" 
                        onClick={() => { setSelectedSpecs(product); setActiveTab('specs'); }}
                      >
                         Quick View <FaPlusCircle />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* --- RESPONSIVE TABBED MODAL --- */}
            {selectedSpecs && (
              <div
                className="modal-overlay d-flex align-items-center justify-content-center px-2"
                onClick={() => setSelectedSpecs(null)}
              >
                <div
                  className="modal-content-custom bg-white p-0 rounded-4 shadow-lg animate-pop"
                  onClick={(e) => e.stopPropagation()}
                >
                  {/* Modal Header */}
                  <div className="p-3 border-bottom d-flex justify-content-between align-items-center bg-light rounded-top-4">
                    <div className="text-truncate">
                      <h2 className="fw-bold mb-0 text-capitalize text-primary text-truncate">
                        {selectedSpecs.title}/{selectedSpecs.brand_name}
                      </h2>
                      <small className="text-muted x-small">
                        Reference: {selectedSpecs.slug}
                      </small>
                    </div>
                    <button
                      className="btn btn-sm btn-outline-secondary rounded-circle"
                      onClick={() => setSelectedSpecs(null)}
                    >
                      <FaTimes />
                    </button>
                  </div>
      
                  {/* Tabs */}
                  <ul
                    className="nav nav-pills nav-fill p-2 bg-light border-bottom"
                    role="tablist"
                  >
                    <li className="nav-item">
                      <button
                        className={`nav-link py-2 fw-bold small ${activeTab === "specs" ? "active shadow-sm" : "text-muted"}`}
                        onClick={() => setActiveTab("specs")}
                      >
                        <FaCogs className="me-1" /> Tech
                      </button>
                    </li>
                    <li className="nav-item">
                      <button
                        className={`nav-link py-2 fw-bold small ${activeTab === "legal" ? "active shadow-sm" : "text-muted"}`}
                        onClick={() => setActiveTab("legal")}
                      >
                        <FaFileContract className="me-1" /> Legal
                      </button>
                    </li>
                  </ul>
      
                  {/* Tab Content */}
                  <div
                    className="p-3"
                    style={{ maxHeight: "60vh", overflowY: "auto" }}
                  >
                    {activeTab === "specs" && (
                      <div className="row g-2 animate-fade-in">
                        <SpecItem
                          icon={<FaCalendarAlt />}
                          label="Year"
                          value={selectedSpecs.model_year}
                        />
                        <SpecItem
                          icon={<FaRoad />}
                          label="KM Run"
                          value={`${Number(selectedSpecs.kilometers_run).toLocaleString()}`}
                        />
                        <SpecItem
                          icon={<FaGasPump />}
                          label="Fuel"
                          value={selectedSpecs.fuel_type}
                        />
                        <SpecItem
                          icon={<FaCogs />}
                          label="Trans."
                          value={selectedSpecs.transmission}
                        />
                        <SpecItem
                          icon={<FaRoad />}
                          label="Mileage"
                          value={
                            selectedSpecs.mileage
                              ? `${selectedSpecs.mileage} kmpl`
                              : "N/A"
                          }
                        />
                        <SpecItem
                          icon={<FaPalette />}
                          label="Color"
                          value={selectedSpecs.color || "N/A"}
                        />
                        <SpecItem
                          icon={<FaCogs />}
                          label="Engine"
                          value={selectedSpecs.engine_capacity}
                        />
                        <SpecItem
                          icon={<FaCheckCircle />}
                          label="Condition"
                          value={selectedSpecs.condition}
                        />
                      </div>
                    )}
      
                    {activeTab === "legal" && (
                      <div className="animate-fade-in d-flex flex-column gap-1">
                        <LegalRow
                          label="Ownership"
                          value={`${selectedSpecs.ownership_number} Owner`}
                        />
                        <LegalRow
                          label="Reg. Number"
                          value={selectedSpecs.registration_number || "N/A"}
                        />
                        <LegalRow
                          label="Engine Number"
                          value={selectedSpecs.engine_number || "On Request"}
                        />
                        <LegalRow
                          label="Chassis Number"
                          value={selectedSpecs.chassis_number || "On Request"}
                        />
                        <LegalRow
                          label="Tax Expiry"
                          value={selectedSpecs.tax_token_expiry || "N/A"}
                          isDate
                        />
                      </div>
                    )}
                  </div>
      
                  {/* Footer */}
                  <div className="p-3 border-top bg-light rounded-bottom-4">
                    <button
                      className="btn btn-primary w-100 py-2 fw-bold"
                      onClick={() => navigate(`/product/${selectedSpecs.id}`)}
                    >
                      View Full Details
                    </button>
                  </div>
                </div>
              </div>
            )}
      
            {/* STYLES */}
            <style>{`
              .hover-up { transition: all 0.3s ease; }
              @media (min-width: 992px) { .hover-up:hover { transform: translateY(-8px); box-shadow: 0 10px 20px rgba(0,0,0,0.1) !important; } }
              .x-small { font-size: 0.65rem; }
              .cursor-pointer { cursor: pointer; }
              .rounded-4 { border-radius: 1rem !important; }
              .border-primary-light { border-color: #cfe2ff !important; }
      
              /* Ribbon Styles */
              .ribbon-wrapper { width: 75px; height: 75px; overflow: hidden; position: absolute; top: 0; left: 0; z-index: 2; }
              .ribbon {
                font-weight: bold; font-size: 8px; text-transform: uppercase; text-align: center;
                transform: rotate(-45deg); position: relative; padding: 3px 0; left: -24px; top: 14px; width: 110px;
                color: #fff; box-shadow: 0 2px 4px rgba(0,0,0,0.1);
              }
              .ribbon.brand-new { background: #198754; }
              .ribbon.excellent { background: #0d6efd; }
              .ribbon.good { background: #ffc107; color: #000; }
      
              /* Modal Styles */
              .modal-overlay {
                position: fixed; top: 0; left: 0; width: 100%; height: 100%;
                background: rgba(0,0,0,0.7); z-index: 2000; backdrop-filter: blur(4px);
              }
              .modal-content-custom { width: 100%; max-width: 400px; }
              .animate-pop { animation: pop 0.25s ease-out; }
              .animate-fade-in { animation: fadeIn 0.3s ease-in; }
              @keyframes pop { from { transform: scale(0.9); opacity: 0; } to { transform: scale(1); opacity: 1; } }
              @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
            `}</style>
          </section>
        );
      };
      
      // --- HELPER COMPONENTS ---
      
      const SpecItem = ({ icon, label, value }) => (
        <div className="col-6">
          <div className="p-2 border rounded bg-white d-flex align-items-center gap-2 h-100 shadow-sm">
            <div className="text-primary small">{icon}</div>
            <div className="text-truncate">
              <div className="text-muted" style={{ fontSize: "0.6rem" }}>
                {label}
              </div>
              <div
                className="fw-bold text-dark text-truncate"
                style={{ fontSize: "0.75rem" }}
              >
                {value}
              </div>
            </div>
          </div>
        </div>
      );
      
      const LegalRow = ({ label, value, isDate }) => {
        const isExpired = isDate && value !== "N/A" && new Date(value) < new Date();
        return (
          <div className="d-flex justify-content-between align-items-center p-2 border-bottom">
            <span className="text-muted small">{label}</span>
            <span
              className={`fw-bold small ${isExpired ? "text-danger" : "text-dark"}`}
            >
              {value} {isExpired && "(Expired)"}
            </span>
          </div>
        );
};

export default LatestProducts;