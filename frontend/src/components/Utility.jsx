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
                <h5 className="mb-1">Spedizione Gratuita</h5>
                <p className="mb-0">Per ordini superiori a 50€</p>
              </div>
            </div>
          </div>
          <div className="col-10 col-sm-6 col-md-4 col-lg-3 text-white">
            <div className="d-flex align-items-center justify-content-center">
              <div className="me-2">
                <i className="bi bi-arrow-counterclockwise fs-1 text-main-light"></i>
              </div>
              <div>
                <h5 className="mb-1">Reso Gratuito</h5>
                <p className="mb-0">Entro 30 giorni garantito</p>
              </div>
            </div>
          </div>
          <div className="col-10 col-sm-6 col-md-4 col-lg-3 text-white">
            <div className="d-flex align-items-center justify-content-center">
              <div className="me-2">
                <i className="bi bi-shield-check fs-1 text-main-light"></i>
              </div>
              <div>
                <h5 className="mb-1">Pagamenti Sicuri</h5>
                <p className="mb-0">Transazioni 100% sicure</p>
              </div>
            </div>
          </div>
          <div className="col-10 col-sm-6 col-md-4 col-lg-3 text-white">
            <div className="d-flex align-items-center justify-content-center">
              <div className="me-2">
                <i className="bi bi-headset fs-1 text-main-light"></i>
              </div>
              <div>
                <h5 className="mb-1">Supporto Clienti</h5>
                <p className="mb-0">Assistenza 7 giorni su 7</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

  );
};

export default FeaturesSection;