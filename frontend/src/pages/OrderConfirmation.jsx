import React from "react";
import { useLocation, Link } from "react-router-dom";

export default function OrderConfirmation() {
  const location = useLocation();
  const { orderId, customerName, total } = location.state || {};

  if (!orderId) {
    return (
      <div className="container my-5 text-center">
        <h2>No order to display</h2>
        <p>It seems you arrived here by mistake.</p>
        <Link to="/" className="btn btn-main-light mt-3">
          Back to Home
        </Link>
      </div>
    );
  }

  return (
    <div className="container my-5">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card border-0 shadow">
            <div className="card-body text-center p-5">
              <div className="mb-4">
                {/* Using Bootstrap icon instead of react-icons */}
                <i
                  className="bi bi-check-circle-fill text-success"
                  style={{ fontSize: "5rem" }}
                ></i>
              </div>
              <h1 className="display-4 mb-4">Order Confirmed!</h1>
              <h2 className="mb-4">Thank you {customerName?.split(" ")[0]}</h2>

              <p className="lead mb-4">
                Your order #{orderId} has been confirmed and will be processed
                as soon as possible.
              </p>

              <div className="bg-light p-4 rounded mb-4">
                <p className="mb-1">
                  An order confirmation has been sent to your email address.
                </p>
                <p className="mb-0">
                  You will receive another email when your order has been
                  shipped.
                </p>
              </div>

              {total && (
                <div className="mb-4">
                  <h3>Order total: €{total.toFixed(2)}</h3>
                </div>
              )}

              <div className="d-flex justify-content-center gap-3 mt-4">
                <Link to="/" className="btn btn-main-light btn-lg">
                  Continue Shopping
                </Link>
                <Link
                  to={`/account/orders/${orderId}`}
                  className="btn btn-outline-dark btn-lg"
                >
                  Order Details
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
