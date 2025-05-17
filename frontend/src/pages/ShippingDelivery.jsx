import { Link } from "react-router-dom";

export default function ShippingDelivery() {
  return (
    <div className="container my-5">
      <div className="row justify-content-center">
        <div className="col-12 col-lg-10">
          <div className="card border-0 shadow">
            <div className="card-body p-4 p-md-5">
              <h1 className="text-center mb-4 fw-bold">Shipping & Delivery</h1>

              {/* Shipping Methods Section */}
              <section className="mb-5">
                <h2 className="h4 fw-bold mb-3">Shipping Methods</h2>
                <div className="row g-4">
                  <div className="col-md-6">
                    <div className="card h-100 border-0 bg-light">
                      <div className="card-body">
                        <h3 className="h5 fw-bold mb-3">
                          <i className="bi bi-truck me-2"></i>
                          Standard Shipping
                        </h3>
                        <ul className="list-unstyled mb-0">
                          <li className="mb-2">• 3-5 business days</li>
                          <li className="mb-2">• Free for orders over €100</li>
                          <li className="mb-2">
                            • €4.99 for orders under €100
                          </li>
                          <li>• Tracking number provided</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="card h-100 border-0 bg-light">
                      <div className="card-body">
                        <h3 className="h5 fw-bold mb-3">
                          <i className="bi bi-lightning-charge me-2"></i>
                          Express Shipping
                        </h3>
                        <ul className="list-unstyled mb-0">
                          <li className="mb-2">• 1-2 business days</li>
                          <li className="mb-2">• €9.99 flat rate</li>
                          <li className="mb-2">• Priority handling</li>
                          <li>• Real-time tracking</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* Delivery Areas Section */}
              <section className="mb-5">
                <h2 className="h4 fw-bold mb-3">Delivery Areas</h2>
                <div className="card border-0 bg-light">
                  <div className="card-body">
                    <p className="mb-0">
                      We currently deliver to all major cities and regions in
                      Italy. For international shipping, please contact our
                      customer service for specific rates and delivery times.
                    </p>
                  </div>
                </div>
              </section>

              {/* Order Processing Section */}
              <section className="mb-5">
                <h2 className="h4 fw-bold mb-3">Order Processing</h2>
                <div className="card border-0 bg-light">
                  <div className="card-body">
                    <ol className="mb-0">
                      <li className="mb-2">
                        Order confirmation sent via email
                      </li>
                      <li className="mb-2">Order processed within 24 hours</li>
                      <li className="mb-2">
                        Shipping confirmation with tracking number
                      </li>
                      <li>Estimated delivery time provided</li>
                    </ol>
                  </div>
                </div>
              </section>

              {/* Tracking Section */}
              <section className="mb-5">
                <h2 className="h4 fw-bold mb-3">Track Your Order</h2>
                <div className="card border-0 bg-light">
                  <div className="card-body">
                    <p className="mb-3">
                      Once your order is shipped, you'll receive a tracking
                      number via email. You can track your order status using
                      our
                      <Link
                        to="/order-status"
                        className="text-decoration-none ms-1"
                      >
                        Order Tracking System
                      </Link>
                      .
                    </p>
                  </div>
                </div>
              </section>

              {/* Contact Section */}
              <section>
                <h2 className="h4 fw-bold mb-3">Need Help?</h2>
                <div className="card border-0 bg-light">
                  <div className="card-body">
                    <p className="mb-0">
                      For any questions about shipping or delivery, please
                      contact our customer service team at{" "}
                      <a
                        href="mailto:kickssocietycs@gmail.com"
                        className="text-decoration-none"
                      >
                        shipping@kicksociety.com
                      </a>{" "}
                      or call us at +39 123 456 7890.
                    </p>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 