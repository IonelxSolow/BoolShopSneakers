import React from "react";
const FeaturesSection = () => {
  return (
    <section className="py-3 mb-5 shadow-lg" style={{ backgroundColor: "var(--bs-secondary)" }}>
      <div className="container">
        <div className="row justify-content-center gy-3">
          <div className="col-6 col-md-6 col-lg-3 text-white">
            <div className="d-flex align-items-center justify-content-start">
              <div className="me-3 d-flex justify-content-center align-items-center" style={{ width: "3rem", height: "3rem", backgroundColor: "var(--main-light)", borderRadius: "25%" }}>
                <i className="bi bi-truck fs-3" style={{ color: "var(--bs-secondary)" }}></i>
              </div>
              <div>
                <h5 className="mb-1 fst-italic text-light">Free Shipping</h5>
                <p className="mb-0">For orders over €100</p>
              </div>
            </div>
          </div>
          <div className="col-6 col-md-6 col-lg-3 text-white">
            <div className="d-flex align-items-center justify-content-start m-md-auto">
              <div className="me-3 d-flex justify-content-center align-items-center" style={{ width: "3rem", height: "3rem", backgroundColor: "var(--main-light)", borderRadius: "25%" }}>
                <i className="bi bi-arrow-counterclockwise fs-3" style={{ color: "var(--bs-secondary)" }}></i>
              </div>
              <div>
                <h5 className="mb-1 fst-italic">Free Returns</h5>
                <p className="mb-0">
                  30 day trial</p>
              </div>
            </div>
          </div>
          <div className="col-6 col-md-6 col-lg-3 text-white">
            <div className="d-flex align-items-center justify-content-start">
              <div className="me-3 d-flex justify-content-center align-items-center" style={{ width: "3rem", height: "3rem", backgroundColor: "var(--main-light)", borderRadius: "25%" }}>
                <i className="bi bi-shield-check fs-3" style={{ color: "var(--bs-secondary)" }}></i>
              </div>
              <div>
                <h5 className="mb-1 fst-italic">Secure Payments</h5>
                <p className="mb-0">100% safe transactions</p>
              </div>
            </div>
          </div>
          <div className="col-6 col-md-6 col-lg-3 text-white">
            <div className="d-flex align-items-center justify-content-start">
              <div className="me-3 d-flex justify-content-center align-items-center" style={{ width: "3rem", height: "3rem", backgroundColor: "var(--main-light)", borderRadius: "25%" }}>
                <i className="bi bi-headset fs-3" style={{ color: "var(--bs-secondary)" }}></i>
              </div>
              <div>
                <h5 className="mb-1 fst-italic">Customer Support</h5>
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