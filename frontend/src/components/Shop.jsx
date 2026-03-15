import React from "react";
import Layout from "./common/Layout";
import ProductImage from "../assets/images/honda.jpg";

const Shop = () => {
  return (
    <Layout>
      <div className="container py-5">
        {/* Breadcrumb Navigation */}
        <nav aria-label="breadcrumb" className="mb-4">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <a href="/">Home</a>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              <a href="/shop">Shop</a>
            </li>
          </ol>
        </nav>

        <div className="row">
          {/* Sidebar Filters */}
          <div className="col-md-3">
            <div className="card shadow-sm border-0 mb-4">
              <div className="card-body p-4">
                <h3 className="h5 fw-bold mb-3">Category</h3>
                <ul className="list-unstyled">
                  {["Car", "Bike", "Accessories"].map((cat) => (
                    <li key={cat} className="mb-2">
                      <div className="form-check">
                        <input className="form-check-input" type="checkbox" id={cat} />
                        <label className="form-check-label ps-2" htmlFor={cat}>{cat}</label>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="card shadow-sm border-0 mb-4">
              <div className="card-body p-4">
                <h3 className="h5 fw-bold mb-3">Brands</h3>
                <ul className="list-unstyled">
                  {["Honda", "Bajaj", "Yamaha", "Tesla", "BYD", "Mercedes"].map((brand) => (
                    <li key={brand} className="mb-2">
                      <div className="form-check">
                        <input className="form-check-input" type="checkbox" id={brand} />
                        <label className="form-check-label ps-2" htmlFor={brand}>{brand}</label>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Product Grid */}
          <div className="col-md-9">
            <div className="row g-4">
              {/* Single Product Card */}
              <div className="col-md-4 col-6">
                <div className="product card border-0 shadow-sm">
                  <div className="card-img">
                    {/* Using local image from public folder */}
                    <img src={ProductImage} alt="Suzuki Sports Bike" className="w-100" />
                  </div>
                  <div className="card-body pt-3">
                    <a href="/product/1" className="fw-bold text-dark d-block mb-1">
                      Suzuki Sports Bike
                    </a>
                    <div className="price fw-bold text-primary">
                      Rs. 100,000 
                      <span className="text-muted text-decoration-line-through small ms-2">
                        Rs. 110,000
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-4 col-6">
                <div className="product card border-0 shadow-sm">
                  <div className="card-img">
                    {/* Using local image from public folder */}
                    <img src={ProductImage} alt="Suzuki Sports Bike" className="w-100" />
                  </div>
                  <div className="card-body pt-3">
                    <a href="/product/1" className="fw-bold text-dark d-block mb-1">
                      Suzuki Sports Bike
                    </a>
                    <div className="price fw-bold text-primary">
                      Rs. 100,000 
                      <span className="text-muted text-decoration-line-through small ms-2">
                        Rs. 110,000
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-4 col-6">
                <div className="product card border-0 shadow-sm">
                  <div className="card-img">
                    {/* Using local image from public folder */}
                    <img src={ProductImage} alt="Suzuki Sports Bike" className="w-100" />
                  </div>
                  <div className="card-body pt-3">
                    <a href="/product/1" className="fw-bold text-dark d-block mb-1">
                      Suzuki Sports Bike
                    </a>
                    <div className="price fw-bold text-primary">
                      Rs. 100,000 
                      <span className="text-muted text-decoration-line-through small ms-2">
                        Rs. 110,000
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-4 col-6">
                <div className="product card border-0 shadow-sm">
                  <div className="card-img">
                    {/* Using local image from public folder */}
                    <img src={ProductImage} alt="Suzuki Sports Bike" className="w-100" />
                  </div>
                  <div className="card-body pt-3">
                    <a href="/product/1" className="fw-bold text-dark d-block mb-1">
                      Suzuki Sports Bike
                    </a>
                    <div className="price fw-bold text-primary">
                      Rs. 100,000 
                      <span className="text-muted text-decoration-line-through small ms-2">
                        Rs. 110,000
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-4 col-6">
                <div className="product card border-0 shadow-sm">
                  <div className="card-img">
                    {/* Using local image from public folder */}
                    <img src={ProductImage} alt="Suzuki Sports Bike" className="w-100" />
                  </div>
                  <div className="card-body pt-3">
                    <a href="/product/1" className="fw-bold text-dark d-block mb-1">
                      Suzuki Sports Bike
                    </a>
                    <div className="price fw-bold text-primary">
                      Rs. 100,000 
                      <span className="text-muted text-decoration-line-through small ms-2">
                        Rs. 110,000
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-4 col-6">
                <div className="product card border-0 shadow-sm">
                  <div className="card-img">
                    {/* Using local image from public folder */}
                    <img src={ProductImage} alt="Suzuki Sports Bike" className="w-100" />
                  </div>
                  <div className="card-body pt-3">
                    <a href="/product/1" className="fw-bold text-dark d-block mb-1">
                      Suzuki Sports Bike
                    </a>
                    <div className="price fw-bold text-primary">
                      Rs. 100,000 
                      <span className="text-muted text-decoration-line-through small ms-2">
                        Rs. 110,000
                      </span>
                    </div>
                  </div>
                </div>
              </div>


              {/* Duplicate the card here or use a .map() for more items */}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Shop;