import React from "react";
import SliderThree from "../../assets/images/bike1.jpg";


const LatestProducts = () => {
  return (
    <section className="section-2 py-5">
      <div className="container">
        <h2>New Arrivals</h2>
        <div className="row mt-3">
          <div className="col-md-3 col-6">
            <div className="product card border-0">
              <div className="card-img">
                <img src={SliderThree} alt="" className="w-100" />
              </div>
              <div className="card-body pt-3">
                <a href="">Suzuki sports Bike</a>
                <div className="price">
                  Rs. 1,00,000
                  <span className="text-decoration-line-through">
                    Rs. 95000
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="product card border-0">
              <div className="card-img">
                <img src={SliderThree} alt="" className="w-100" />
              </div>
              <div className="card-body pt-3">
                <a href="">Suzuki sports Bike</a>
                <div className="price">
                  Rs. 1,00,000
                  <span className="text-decoration-line-through">
                    Rs. 95000
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="product card border-0">
              <div className="card-img">
                <img src={SliderThree} alt="" className="w-100" />
              </div>
              <div className="card-body pt-3">
                <a href="">Suzuki sports Bike</a>
                <div className="price">
                  Rs. 1,00,000
                  <span className="text-decoration-line-through">
                    Rs. 95000
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="product card border-0">
              <div className="card-img">
                <img src={SliderThree} alt="" className="w-100" />
              </div>
              <div className="card-body pt-3">
                <a href="">Suzuki sports Bike</a>
                <div className="price">
                  Rs. 1,00,000
                  <span className="text-decoration-line-through">
                    Rs. 95000
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

export default LatestProducts;
