import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { API_URL } from "../config";

export default function OrderDetails() {
  const { orderId } = useParams();
  const [orderData, setOrderData] = useState({
    state: "loading",
    order: null,
    items: [],
  });

  useEffect(() => {
    if (!orderId) return;

    // Set loading state
    setOrderData({
      ...orderData,
      state: "loading",
    });

    // Retrieve order details - using the purchase_order value
    fetch(`${API_URL}/boolshop/api/v1/orders/${orderId}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Order not found");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Order data received:", data);

        // Check if data is an array and contains elements
        if (Array.isArray(data) && data.length > 0) {
          // Extract order information from the first element
          const orderDetails = {
            id: data[0].order_id,
            purchase_order: data[0].purchase_order,
            name: data[0].customer_name,
            email: data[0].customer_email,
            address: data[0].shipping_address,
            phone: data[0].customer_phone,
            total_price: data[0].total_price,
            status: data[0].status,
            discount_id: data[0].discount_id,
            delivery_fee: data[0].delivery_fee,
            payment_type: data[0].payment_type,
            created_at: data[0].created_at,
          };

          // Set order data
          setOrderData({
            state: "success",
            order: orderDetails,
            items: getItemsFromOrderData(data),
          });
        } else {
          // Handle empty response or invalid format
          throw new Error("Invalid order data format");
        }
      })
      .catch((error) => {
        console.error("Error retrieving order:", error);
        setOrderData({
          state: "error",
          message: error.message || "Unable to load order details",
        });
      });
  }, [orderId]);

  // Helper function to extract and organize order items
  const getItemsFromOrderData = (data) => {
    if (data && Array.isArray(data)) {
      // Group items by variant to consolidate quantities
      const itemsMap = {};

      data.forEach((item) => {
        const variantId = item.variant_id;

        if (!itemsMap[variantId]) {
          itemsMap[variantId] = {
            variant_id: variantId,
            name: item.product_brand
              ? `${item.product_brand} ${item.product_name}`
              : item.product_name || "Product",
            sku: item.sku,
            quantity: parseInt(item.quantity) || 1,
            price: parseFloat(item.item_price) || 0,
            total:
              (parseFloat(item.item_price) || 0) *
              (parseInt(item.quantity) || 1),
          };
        } else {
          // If the variant already exists, add to quantity and total
          const qty = parseInt(item.quantity) || 1;
          itemsMap[variantId].quantity += qty;
          itemsMap[variantId].total += (parseFloat(item.item_price) || 0) * qty;
        }
      });

      return Object.values(itemsMap);
    }

    // Fallback if data structure is unexpected
    return [];
  };

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";

    try {
      const date = new Date(dateString);
      return new Intl.DateTimeFormat("en-US", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }).format(date);
    } catch (e) {
      console.error("Error formatting date:", e);
      return dateString;
    }
  };

  // Render based on state
  switch (orderData.state) {
    case "loading":
      return (
        <div className="container my-5">
          <div className="card border-0 shadow">
            <div className="card-body p-5 text-center">
              <div className="mb-4">
                <div
                  className="spinner-border text-main-light"
                  role="status"
                  style={{ width: "3rem", height: "3rem" }}
                >
                  <span className="visually-hidden">Loading...</span>
                </div>
              </div>
              <h3 className="mb-3">Loading Order Details</h3>
              <p className="text-muted">
                Please wait while we retrieve your order information...
              </p>
            </div>
          </div>
        </div>
      );

    case "error":
      return (
        <div className="container my-5">
          <div className="card border-0 shadow">
            <div className="card-body p-5 text-center">
              <div className="mb-4">
                <i
                  className="bi bi-exclamation-circle-fill text-danger"
                  style={{ fontSize: "4rem" }}
                ></i>
              </div>
              <h3 className="mb-3">Order Not Found</h3>
              <p className="text-muted mb-4">
                {orderData.message ||
                  "We couldn't find the order you're looking for. It may have been removed or you entered an incorrect ID."}
              </p>
              <div className="d-flex justify-content-center">
                <Link to="/" className="btn btn-main-light me-2">
                  Go to Homepage
                </Link>
                <Link to="/cart" className="btn btn-outline-secondary">
                  View Cart
                </Link>
              </div>
            </div>
          </div>
        </div>
      );

    case "success":
      const order = orderData.order;

      // If no order object is available, show an error state
      if (!order) {
        return (
          <div className="container my-5">
            <div className="card border-0 shadow">
              <div className="card-body p-5 text-center">
                <div className="mb-4">
                  <i
                    className="bi bi-question-circle-fill text-warning"
                    style={{ fontSize: "4rem" }}
                  ></i>
                </div>
                <h3 className="mb-3">Order Information Not Available</h3>
                <p className="text-muted mb-4">
                  The order information cannot be retrieved or might be
                  incomplete. This could be due to a temporary issue.
                </p>
                <div className="d-flex justify-content-center">
                  <Link to="/" className="btn btn-main-light me-2">
                    Go to Homepage
                  </Link>
                  <button
                    onClick={() => window.location.reload()}
                    className="btn btn-outline-secondary"
                  >
                    Try Again
                  </button>
                </div>
              </div>
            </div>
          </div>
        );
      }

      return (
        <div className="container my-5 order-details">
          <div className="row">
            <div className="col-12">
              <div className="d-flex justify-content-between align-items-center mb-4">
                <h2 className="mb-0 fw-bold">Order Details</h2>
                <Link to="/" className="btn btn-main-light">
                  <i className="bi bi-arrow-left me-2"></i>Back to Shopping
                </Link>
              </div>

              <div className="card shadow-sm mb-4">
                <div className="card-header bg-main-light">
                  <div className="d-flex justify-content-between align-items-center">
                    <h5 className="mb-0 fw-bold">
                      Order #{order.purchase_order}
                    </h5>
                    <span className="badge bg-dark text-white">
                      {order.status === "pending" ? "Pending" : order.status}
                    </span>
                  </div>
                </div>
                <div className="card-body">
                  <div className="row mb-4">
                    <div className="col-md-6">
                      <h6 className="text-uppercase text-secondary">
                        Ordered by
                      </h6>
                      <p className="mb-1">{order.name}</p>
                      <p className="mb-1">{order.email}</p>
                      <p className="mb-1">{order.phone}</p>
                    </div>
                    <div className="col-md-6">
                      <h6 className="text-uppercase text-secondary">
                        Shipping Address
                      </h6>
                      <p className="mb-0">{order.address}</p>
                    </div>
                  </div>

                  <div className="row mb-4">
                    <div className="col-md-6">
                      <h6 className="text-uppercase text-secondary">
                        Order Date
                      </h6>
                      <p className="mb-0">{formatDate(order.created_at)}</p>
                    </div>
                    <div className="col-md-6">
                      <h6 className="text-uppercase text-secondary">
                        Payment Method
                      </h6>
                      <p className="mb-0">
                        {order.payment_type === "card"
                          ? "Credit card"
                          : order.payment_type}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="card shadow-sm mb-4">
                <div className="card-header bg-white">
                  <h5 className="mb-0">Ordered Items</h5>
                </div>
                <div className="card-body p-0">
                  <div className="table-responsive">
                    <table className="table table-hover mb-0">
                      <thead className="table-light">
                        <tr>
                          <th>Product</th>
                          <th>SKU</th>
                          <th className="text-center">Quantity</th>
                          <th className="text-end">Price</th>
                          <th className="text-end">Total</th>
                        </tr>
                      </thead>
                      <tbody>
                        {orderData.items.length > 0 ? (
                          orderData.items.map((item, index) => (
                            <tr key={index}>
                              <td className="fw-medium">
                                {item.name || "Product Name"}
                              </td>
                              <td>{item.sku || "-"}</td>
                              <td className="text-center">{item.quantity}</td>
                              <td className="text-end">
                                €{parseFloat(item.price).toFixed(2)}
                              </td>
                              <td className="text-end fw-medium">
                                €
                                {(
                                  item.quantity * parseFloat(item.price)
                                ).toFixed(2)}
                              </td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td colSpan="5" className="text-center py-3">
                              <div className="text-muted">
                                No items found for this order
                              </div>
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>

              <div className="card shadow-sm">
                <div className="card-body">
                  <div className="row">
                    <div className="col-md-6">
                      <h6 className="text-uppercase text-secondary mb-3">
                        Order Status
                      </h6>
                      <div className="mb-3">
                        <span
                          className={`badge ${
                            order.status === "completed"
                              ? "bg-success"
                              : order.status === "pending"
                              ? "bg-warning"
                              : order.status === "processing"
                              ? "bg-info"
                              : "bg-secondary"
                          }`}
                        >
                          {order.status === "pending"
                            ? "Pending"
                            : order.status || "Pending"}
                        </span>
                      </div>
                      <p className="small text-muted mb-0">
                        For any questions about your order, please contact our
                        customer service at support@kicksociety.com
                      </p>
                    </div>
                    <div className="col-md-6">
                      <div className="d-flex justify-content-end">
                        <div style={{ width: "250px" }}>
                          <div className="d-flex justify-content-between mb-2">
                            <span className="text-secondary">Subtotal:</span>
                            <span>
                              €
                              {parseFloat(
                                order.total_price - (order.delivery_fee || 0)
                              ).toFixed(2)}
                            </span>
                          </div>
                          <div className="d-flex justify-content-between mb-2">
                            <span className="text-secondary">Shipping:</span>
                            <span>
                              €{parseFloat(order.delivery_fee || 0).toFixed(2)}
                            </span>
                          </div>
                          {order.discount_id && (
                            <div className="d-flex justify-content-between mb-2">
                              <span className="text-secondary">Discount:</span>
                              <span>
                                -€
                                {parseFloat(order.discount_value || 0).toFixed(
                                  2
                                )}
                              </span>
                            </div>
                          )}
                          <hr />
                          <div className="d-flex justify-content-between mb-2">
                            <span className="fw-bold">Total:</span>
                            <span className="fw-bold">
                              €{parseFloat(order.total_price).toFixed(2)}
                            </span>
                          </div>

                          <div className="mt-4">
                            <Link to="/" className="btn btn-main-light w-100">
                              Continue Shopping
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
  }
}
