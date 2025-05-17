import { Link } from "react-router-dom";

export default function Returns() {
  return (
    <div className="container my-5">
      <div className="row justify-content-center">
        <div className="col-12 col-lg-10">
          <div className="card border-0 shadow">
            <div className="card-body p-4 p-md-5">
              <h1 className="text-center mb-4 fw-bold">Returns & Refunds</h1>

              {/* Return Policy Overview */}
              <section className="mb-5">
                <h2 className="h4 fw-bold mb-3">Our Return Policy</h2>
                <div className="card border-0 bg-light">
                  <div className="card-body">
                    <p className="mb-0">
                      At KICKSOCIETY, we want you to be completely satisfied with your purchase. 
                      You have 14 days from the date of delivery to return any item that doesn't 
                      meet your expectations. All items must be unworn, in their original condition, 
                      and with all original packaging and tags attached.
                    </p>
                  </div>
                </div>
              </section>

              {/* Return Process */}
              <section className="mb-5">
                <h2 className="h4 fw-bold mb-3">How to Return an Item</h2>
                <div className="card border-0 bg-light">
                  <div className="card-body">
                    <ol className="mb-0">
                      <li className="mb-3">
                        <strong>Initiate Return</strong>
                        <p className="mb-0 mt-2">
                          Log into your account and go to your order history. Select the item you wish 
                          to return and follow the return process.
                        </p>
                      </li>
                      <li className="mb-3">
                        <strong>Package Your Item</strong>
                        <p className="mb-0 mt-2">
                          Place the item in its original packaging with all tags attached. Include the 
                          return form in the package.
                        </p>
                      </li>
                      <li className="mb-3">
                        <strong>Ship Your Return</strong>
                        <p className="mb-0 mt-2">
                          Use the provided return label and drop off your package at your nearest 
                          shipping point. Keep your tracking number for reference.
                        </p>
                      </li>
                      <li>
                        <strong>Receive Refund</strong>
                        <p className="mb-0 mt-2">
                          Once we receive and inspect your return, we'll process your refund within 
                          5-7 business days.
                        </p>
                      </li>
                    </ol>
                  </div>
                </div>
              </section>

              {/* Return Conditions */}
              <section className="mb-5">
                <h2 className="h4 fw-bold mb-3">Return Conditions</h2>
                <div className="row g-4">
                  <div className="col-md-6">
                    <div className="card h-100 border-0 bg-light">
                      <div className="card-body">
                        <h3 className="h5 fw-bold mb-3">
                          <i className="bi bi-check-circle me-2"></i>
                          Items That Can Be Returned
                        </h3>
                        <ul className="list-unstyled mb-0">
                          <li className="mb-2">• Unworn items</li>
                          <li className="mb-2">• Original packaging intact</li>
                          <li className="mb-2">• All tags attached</li>
                          <li>• Within 14 days of delivery</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="card h-100 border-0 bg-light">
                      <div className="card-body">
                        <h3 className="h5 fw-bold mb-3">
                          <i className="bi bi-x-circle me-2"></i>
                          Items That Cannot Be Returned
                        </h3>
                        <ul className="list-unstyled mb-0">
                          <li className="mb-2">• Worn items</li>
                          <li className="mb-2">• Items without original packaging</li>
                          <li className="mb-2">• Items without tags</li>
                          <li>• Items after 14 days</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* Refund Information */}
              <section className="mb-5">
                <h2 className="h4 fw-bold mb-3">Refund Information</h2>
                <div className="card border-0 bg-light">
                  <div className="card-body">
                    <ul className="mb-0">
                      <li className="mb-2">• Refunds are processed within 5-7 business days after receiving the return</li>
                      <li className="mb-2">• The refund will be issued to the original payment method</li>
                      <li className="mb-2">• Shipping costs are non-refundable unless the item was defective</li>
                      <li>• You will receive an email confirmation once the refund is processed</li>
                    </ul>
                  </div>
                </div>
              </section>

              {/* Contact Section */}
              <section>
                <h2 className="h4 fw-bold mb-3">Need Help with Your Return?</h2>
                <div className="card border-0 bg-light">
                  <div className="card-body">
                    <p className="mb-0">
                      If you need assistance with your return or have any questions, please contact our 
                      customer service team at{" "}
                      <a href="mailto:kicksocietycs@gmail.com" className="text-decoration-none">
                        returns@kicksociety.com
                      </a>
                      {" "}or call us at +39 123 456 7890.
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