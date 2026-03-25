import React, { useState, useEffect, useCallback } from "react";
import Layout from "./common/Layout";
import { Link, useNavigate } from "react-router-dom";
import { apiUrl } from "./common/http";
import {
  FaGasPump,
  FaRoad,
  FaCalendarAlt,
  FaCogs,
  FaPlusCircle,
  FaTimes,
  FaCheckCircle,
  FaPalette,
  FaFileContract,
} from "react-icons/fa";

const Shop = () => {
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Filter States
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedBrands, setSelectedBrands] = useState([]);

  // UI States
  const [selectedSpecs, setSelectedSpecs] = useState(null);
  const [activeTab, setActiveTab] = useState("specs");
  const navigate = useNavigate();

  // 1. Fetch Categories & Brands (Once on mount)
  const fetchFilters = useCallback(async () => {
    try {
      const [catRes, brandRes] = await Promise.all([
        fetch(`${apiUrl}/get-categories`),
        fetch(`${apiUrl}/get-brands`),
      ]);
      const catData = await catRes.json();
      const brandData = await brandRes.json();

      if (catData.status === 200) setCategories(catData.data);
      if (brandData.status === 200) setBrands(brandData.data);
    } catch (error) {
      console.error("Error fetching filters:", error);
    }
  }, []);

  // 2. Fetch Products (Triggers on filter change)
  const fetchProducts = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (selectedCategories.length > 0)
        params.append("category", selectedCategories.join(","));
      if (selectedBrands.length > 0)
        params.append("brand", selectedBrands.join(","));

      const res = await fetch(`${apiUrl}/get-products?${params.toString()}`);
      const result = await res.json();

      if (result.status === 200) {
        setProducts(result.data);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  }, [selectedCategories, selectedBrands]);

  useEffect(() => {
    fetchFilters();
  }, [fetchFilters]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  // 3. Handle Checkbox Toggles
  const handleFilterToggle = (id, type) => {
    if (type === "category") {
      setSelectedCategories((prev) =>
        prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id],
      );
    } else {
      setSelectedBrands((prev) =>
        prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id],
      );
    }
  };

  return (
    <Layout>
      <div className="container py-5">
        <nav aria-label="breadcrumb" className="mb-4">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <Link to="/" className="text-decoration-none text-muted">
                Home
              </Link>
            </li>
            <li className="breadcrumb-item active fw-bold text-primary">
              <Link to="/shop" className="text-decoration-none text-muted">
                Shop
              </Link> 
            </li>
          </ol>
        </nav>

        <div className="row">
          {/* Sidebar Filters */}
          <div className="col-md-3">
            <FilterSection
              title="Category"
              items={categories}
              selected={selectedCategories}
              onToggle={(id) => handleFilterToggle(id, "category")}
            />
            <FilterSection
              title="Brands"
              items={brands}
              selected={selectedBrands}
              onToggle={(id) => handleFilterToggle(id, "brand")}
            />
          </div>

          {/* Product Grid */}
          <div className="col-md-9">
            {loading ? (
              <div className="text-center py-5">
                <div
                  className="spinner-border text-primary"
                  role="status"
                ></div>
                <p className="mt-2 text-muted">Filtering products...</p>
              </div>
            ) : (
              <div className="row g-4">
                {products.length > 0 ? (
                  products.map((product) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      onQuickView={(p) => {
                        setSelectedSpecs(p);
                        setActiveTab("specs");
                      }}
                      navigate={navigate}
                    />
                  ))
                ) : (
                  <div className="col-12 text-center py-5">
                    <h4 className="text-muted">
                      No products match your filters.
                    </h4>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Quick View Modal */}
      {selectedSpecs && (
        <QuickViewModal
          product={selectedSpecs}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          onClose={() => setSelectedSpecs(null)}
          navigate={navigate}
        />
      )}

      <style>{`
        .hover-up { transition: all 0.3s ease; border-radius: 12px; }
        .hover-up:hover { transform: translateY(-5px); box-shadow: 0 10px 20px rgba(0,0,0,0.1) !important; }
        .cursor-pointer { cursor: pointer; }
        .ribbon-wrapper { width: 75px; height: 75px; overflow: hidden; position: absolute; top: 0; left: 0; z-index: 2; }
        .ribbon { font-weight: bold; font-size: 8px; text-transform: uppercase; text-align: center; transform: rotate(-45deg); position: relative; padding: 3px 0; left: -24px; top: 14px; width: 110px; color: #fff; }
        .ribbon.brand-new { background: #198754; }
        .ribbon.excellent { background: #0d6efd; }
        .ribbon.good { background: #ffc107; color: #000; }
        .modal-overlay { position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.7); z-index: 2000; backdrop-filter: blur(4px); }
        .modal-content-custom { width: 100%; max-width: 420px; }
      `}</style>
    </Layout>
  );
};

// --- SUB-COMPONENTS ---

const FilterSection = ({ title, items, selected, onToggle }) => (
  <div className="card shadow-sm border-0 mb-4">
    <div className="card-body p-4">
      <h3 className="h5 fw-bold mb-3">{title}</h3>
      <ul className="list-unstyled mb-0">
        {items.map((item) => (
          <li key={item.id} className="mb-2">
            <div className="form-check">
              <input
                type="checkbox"
                className="form-check-input cursor-pointer"
                id={`${title}-${item.id}`}
                checked={selected.includes(item.id)}
                onChange={() => onToggle(item.id)}
              />
              <label
                className="form-check-label ps-2 cursor-pointer w-100"
                htmlFor={`${title}-${item.id}`}
              >
                {item.name}
              </label>
            </div>
          </li>
        ))}
      </ul>
    </div>
  </div>
);

const ProductCard = ({ product, onQuickView, navigate }) => (
  <div className="col-lg-4 col-md-6 col-6">
    <div className="card h-100 border-0 shadow-sm hover-up position-relative overflow-hidden bg-white">
      <div className="ribbon-wrapper">
        <div
          className={`ribbon ${product.condition?.toLowerCase().replace(/\s+/g, "-")}`}
        >
          {product.condition}
        </div>
      </div>
      <div
        className="card-img-wrapper cursor-pointer"
        style={{ height: "160px" }}
        onClick={() => navigate(`/product/${product.id}`)}
      >
        <img
          src={product.image_url}
          alt={product.title}
          className="w-100 h-100 object-fit-cover"
        />
      </div>
      <div className="card-body p-3 d-flex flex-column">
        <h6 className="fw-bold text-dark text-truncate mb-2">
          {product.title}
        </h6>
        <div className="mb-3">
          <span className="fw-bold text-success h5">
            Rs. {Number(product.price).toLocaleString()}
          </span>
        </div>
        <button
          className="btn btn-sm btn-dark w-100 py-2 rounded-3 mt-auto"
          onClick={() => onQuickView(product)}
        >
          Quick View <FaPlusCircle className="ms-1" />
        </button>
      </div>
    </div>
  </div>
);

const QuickViewModal = ({
  product,
  activeTab,
  setActiveTab,
  onClose,
  navigate,
}) => (
  <div
    className="modal-overlay d-flex align-items-center justify-content-center px-2"
    onClick={onClose}
  >
    <div
      className="modal-content-custom bg-white p-0 rounded-4 shadow-lg"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="p-3 border-bottom d-flex justify-content-between align-items-center bg-light rounded-top-4">
        <h5 className="fw-bold mb-0 text-primary text-truncate">
          {product.title}
        </h5>
        <button
          className="btn btn-sm btn-outline-secondary rounded-circle"
          onClick={onClose}
        >
          <FaTimes />
        </button>
      </div>
      <ul className="nav nav-pills nav-fill p-2 bg-light border-bottom">
        <li className="nav-item">
          <button
            className={`nav-link py-2 small ${activeTab === "specs" ? "active" : "text-muted"}`}
            onClick={() => setActiveTab("specs")}
          >
            <FaCogs className="me-1" /> Tech
          </button>
        </li>
        <li className="nav-item">
          <button
            className={`nav-link py-2 small ${activeTab === "legal" ? "active" : "text-muted"}`}
            onClick={() => setActiveTab("legal")}
          >
            <FaFileContract className="me-1" /> Legal
          </button>
        </li>
      </ul>
      <div className="p-3" style={{ maxHeight: "50vh", overflowY: "auto" }}>
        {activeTab === "specs" ? (
          <div className="row g-2">
            {/* Basic Vehicle Info */}
            <SpecBox
              icon={<FaCalendarAlt />}
              label="Year"
              value={product.model_year}
            />
            <SpecBox
              icon={<FaRoad />}
              label="KM Run"
              value={Number(product.kilometers_run).toLocaleString()}
            />
            <SpecBox
              icon={<FaGasPump />}
              label="Fuel"
              value={product.fuel_type}
            />
            <SpecBox
              icon={<FaCheckCircle />}
              label="Condition"
              value={product.condition}
            />

            {/* Technical Specs */}
            <SpecBox
              icon={<FaRoad />}
              label="Mileage"
              value={product.mileage ? `${product.mileage} kmpl` : "N/A"}
            />
            <SpecBox
              icon={<FaCogs />}
              label="Engine"
              value={product.engine_capacity || "N/A"}
            />
            <SpecBox
              icon={<FaPalette />}
              label="Color"
              value={product.color || "N/A"}
            />
            <SpecBox
              icon={<FaCogs />}
              label="Transmission"
              value={product.transmission || "N/A"}
            />
          </div>
        ) : (
          <div className="animate-fade-in d-flex flex-column gap-1">
            <LegalLine
              label="Ownership"
              value={`${product.ownership_number}${product.ownership_number === 1 ? "st" : "nd"} Owner`}
            />
            <LegalLine
              label="Reg. Number"
              value={product.registration_number || "N/A"}
            />
            <LegalLine
              label="Engine Number"
              value={product.engine_number || "On Request"}
            />
            <LegalLine
              label="Chassis Number"
              value={product.chassis_number || "On Request"}
            />
            <LegalLine
              label="Tax Expiry"
              value={product.tax_token_expiry || "N/A"}
            />
          </div>
        )}
      </div>
      <div className="p-3 border-top bg-light rounded-bottom-4">
        <button
          className="btn btn-primary w-100 py-2 fw-bold"
          onClick={() => navigate(`/product/${product.id}`)}
        >
          View Full Details
        </button>
      </div>
    </div>
  </div>
);

const SpecBox = ({ icon, label, value }) => (
  <div className="col-6">
    <div className="p-2 border rounded bg-white d-flex align-items-center gap-2 h-100 shadow-sm">
      <div className="text-primary small">{icon}</div>
      <div className="text-truncate">
        <div className="text-muted" style={{ fontSize: "0.6rem" }}>
          {label}
        </div>
        <div className="fw-bold text-dark" style={{ fontSize: "0.75rem" }}>
          {value}
        </div>
      </div>
    </div>
  </div>
);

const LegalLine = ({ label, value }) => (
  <div className="d-flex justify-content-between align-items-center p-2 border-bottom">
    <span className="text-muted small">{label}</span>
    <span className="fw-bold small text-dark">{value}</span>
  </div>
);

export default Shop;
