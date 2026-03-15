import React from "react";
import SliderFour from "../../assets/images/honda.jpg";


const FeatureProducts = () => {
  return (
    <section className="section-2 py-5">
      <div className="container">
        <h2>Featured Products</h2>
        <div className="row mt-3">
          <div className="col-md-3 col-6">
            <div className="product card border-0">
              <div className="card-img">
                <img src={SliderFour} alt="" className="w-100" />
              </div>
              <div className="card-body pt-3">
                <a href="">Honda sports Bike</a>
                <div className="price">
                  Rs. 3,00,000
                  <span className="text-decoration-line-through">
                    Rs. 2,95,000
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="product card border-0">
              <div className="card-img">
                <img src={SliderFour} alt="" className="w-100" />
              </div>
              <div className="card-body pt-3">
                <a href="">Honda sports Bike</a>
                <div className="price">
                  Rs. 3,00,000
                  <span className="text-decoration-line-through">
                    Rs. 2,95,000
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="product card border-0">
              <div className="card-img">
                <img src={SliderFour} alt="" className="w-100" />
              </div>
              <div className="card-body pt-3">
                <a href="">Honda sports Bike</a>
                <div className="price">
                  Rs. 3,00,000
                  <span className="text-decoration-line-through">
                    Rs. 2,95,000
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="product card border-0">
              <div className="card-img">
                <img src={SliderFour} alt="" className="w-100" />
              </div>
              <div className="card-body pt-3">
                <a href="">Honda sports Bike</a>
                <div className="price">
                  Rs. 3,00,000
                  <span className="text-decoration-line-through">
                    Rs. 2,95,000
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeatureProducts;
