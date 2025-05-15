import React from "react";
const FeaturesSection = () => {
  return (
    <section className="pb-3 mb-5 bg-dark">
      <div className="container">
        <div className="row g-4 justify-content-center text-center">
          <div className="col-10 col-sm-6 col-md-4 col-lg-3 text-white">
            <div className="d-flex align-items-center justify-content-center">
              <div className="me-2">
                <i className="bi bi-truck fs-1 text-main-light"></i>
              </div>
              <div>
                <h5 className="mb-1">Free Shipping</h5>
                <p className="mb-0">For orders over €100</p>
              </div>
            </div>
          </div>
          <div className="col-10 col-sm-6 col-md-4 col-lg-3 text-white">
            <div className="d-flex align-items-center justify-content-center">
              <div className="me-2">
                <i className="bi bi-arrow-counterclockwise fs-1 text-main-light"></i>
              </div>
              <div>
                <h5 className="mb-1">Free Returns</h5>
                <p className="mb-0">Guaranteed within 30 days</p>
              </div>
            </div>
          </div>
          <div className="col-10 col-sm-6 col-md-4 col-lg-3 text-white">
            <div className="d-flex align-items-center justify-content-center">
              <div className="me-2">
                <i className="bi bi-shield-check fs-1 text-main-light"></i>
              </div>
              <div>
                <h5 className="mb-1">Secure Payments</h5>
                <p className="mb-0">100% safe transactions</p>
              </div>
            </div>
          </div>
          <div className="col-10 col-sm-6 col-md-4 col-lg-3 text-white">
            <div className="d-flex align-items-center justify-content-center">
              <div className="me-2">
                <i className="bi bi-headset fs-1 text-main-light"></i>
              </div>
              <div>
                <h5 className="mb-1">Customer Support</h5>
                <p className="mb-0">Assistance 7 days a week</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

  );
};

export default FeaturesSection;