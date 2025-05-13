import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import IncreaseDecrease from "./IncreaseDecrease";

export default function Cart({ toggleCart, isOpen }) {

  const { cart, removeItem, total } = useCart();

  return (
    <div className={`container cart-content d-flex flex-column ${isOpen ? "open" : ""}`}>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <button className="btn close-cart " onClick={toggleCart}>
          <i className="d-flex bi bi-x"></i>
        </button>
        <span>
          <Link to="/cart" className="nav-link cart-link">

            View the cart

          </Link>
        </span>
      </div>

      <h5 className="mt-3 mb-3">Your Cart</h5>

      <div className="cart-items">
        {cart.length > 0 ? (
          cart.map((item) => (
            <div
              key={item.sku}
              className="cart-item d-flex justify-content-between align-items-center mb-2"
            >
              <div className="d-flex flex-column flex-md-row align-items-start align-items-md-center">

                {/* Cerchietto con immagine */}
                <div
                  className="me-3"
                  style={{
                    width: "50px",
                    height: "50px",
                    borderRadius: "50%",
                    overflow: "hidden",
                    flexShrink: 0,
                  }}
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  />
                </div>

                <span style={{ width: "150px" }}>{item.name}</span>

                <div>
                  <IncreaseDecrease item={item} />
                </div>
              </div>

              <div>
                <span>{Number(item.price).toFixed(2)} €</span>
                <button
                  className="btn btn-sm btn-danger ms-3"
                  onClick={() => removeItem(item.sku)}
                >
                  <i className="bi bi-trash"></i>
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>Your cart is empty</p>
        )}
      </div>

      <hr />

      {/* Totale */}
      <div className="mt-auto">
        <h6 className="d-flex justify-content-between">
          <span>Total:</span>
          <span>{total.toFixed(2)}€</span>
        </h6>
        <div className="d-flex justify-content-end align-items-center">
          <Link to="/checkout"
            className={`btn btn-main-light w-auto mt-3 mb-3 ${cart.length > 0 ? "" : "disabled"}`}>
            Go to checkout
          </Link>
        </div>
      </div>
    </div>
  );
}