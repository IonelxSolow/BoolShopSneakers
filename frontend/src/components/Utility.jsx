import React from "react";
const FeaturesSection = () => {
  return (
    <section className="py-5">
      <div className="container">
        <div className="row g-4">
          <div className="col-md-3 col-sm-6">
            <div className="d-flex align-items-center">
              <div className="me-3">
                <i className="bi bi-truck fs-1 text-primary"></i>
              </div>
              <div>
                <h5 className="mb-1">Spedizione Gratuita</h5>
                <p className="mb-0 text-muted">Per ordini superiori a 50€</p>
              </div>
            </div>
          </div>
          <div className="col-md-3 col-sm-6">
            <div className="d-flex align-items-center justify-content-center">
              <div className="me-3">
                <i className="bi bi-arrow-counterclockwise fs-1 text-primary"></i>
              </div>
              <div>
                <h5 className="mb-1">Resi Gratuiti</h5>
                <p className="mb-0 text-muted">Entro 30 giorni dall'acquisto</p>
              </div>
            </div>
          </div>
          <div className="col-md-3 col-sm-6">
            <div className="d-flex align-items-center justify-content-center">
              <div className="me-3">
                <i className="bi bi-shield-check fs-1 text-primary"></i>
              </div>
              <div>
                <h5 className="mb-1">Pagamenti Sicuri</h5>
                <p className="mb-0 text-muted">Transazioni 100% sicure</p>
              </div>
            </div>
          </div>
          <div className="col-md-3 col-sm-6">
            <div className="d-flex align-items-center justify-content-end">
              <div className="me-3">
                <i className="bi bi-headset fs-1 text-primary"></i>
              </div>
              <div>
                <h5 className="mb-1">Supporto Clienti</h5>
                <p className="mb-0 text-muted">Assistenza 7 giorni su 7</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;