import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function OrderStatus() {
  const [orderNumber, setOrderNumber] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (!orderNumber.trim()) {
      setError("Please enter your order number");
      return;
    }

    // Navigate to the order details page
    navigate(`/account/orders/${orderNumber}`);
  };

  return (
    <div className="container my-5">
      <div className="row justify-content-center">
        <div className="col-12 col-md-8 col-lg-6">
          <div className="card border-0 shadow">
            <div className="card-body p-5">
              <h2 className="text-center mb-4 fw-bold">Track Your Order</h2>
              <p className="text-center text-muted mb-4">
                Enter your order number to view your order details and track its status.
              </p>

              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label htmlFor="orderNumber" className="form-label">
                    Order Number
                  </label>
                  <input
                    type="text"
                    className={`form-control form-control-lg ${error ? "is-invalid" : ""}`}
                    id="orderNumber"
                    placeholder="Enter your order number"
                    value={orderNumber}
                    onChange={(e) => setOrderNumber(e.target.value)}
                  />
                  {error && <div className="invalid-feedback">{error}</div>}
                </div>

                <button type="submit" className="btn btn-main-light w-100 py-3">
                  Track Order
                </button>
              </form>

              <div className="mt-4 text-center">
                <p className="text-muted mb-0">
                  Can't find your order number?{" "}
                  <a href="mailto:support@kicksociety.com" className="text-decoration-none">
                    Contact our support
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 