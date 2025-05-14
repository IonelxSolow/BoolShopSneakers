import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import IncreaseDecrease from "./IncreaseDecrease";

export default function Cart({ toggleCart, isOpen }) {
  const { cart, removeItem, total } = useCart();

  return (
    <div
      className={`container cart-content d-flex flex-column ${isOpen ? "open" : ""
        }`}
    >
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

      <div className="cart-items mt-3">
        {cart.length > 0 ? (
          cart.map((item) => (
            <div
              key={item.sku}
              className="cart-item d-flex justify-content-between align-items-center mb-3"
            >
              <div className="d-flex flex-column flex-row align-items-start">
                {/* Cerchietto con immagine */}
                <div className="d-flex align-items-center">
                  <div
                    className="me-3"
                    style={{
                      width: "70px",
                      height: "70px",
                      borderRadius: "20%",
                      overflow: "hidden",
                      flexShrink: 0,
                    }}
                  >
                    <img
                      src={`/assets/${item.image}`}
                      alt={item.name}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                    />
                  </div>

                  <div className="d-flex flex-column justify-content-between h-100">
                  <span style={{maxWidth: "150px"}}>{item.name}</span>
                    <IncreaseDecrease item={item} />
                  </div>
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
      <div>
        <h6 className="d-flex justify-content-between">
          <span>Total:</span>
          <span>{total.toFixed(2)}€</span>
        </h6>
        <div className="d-flex align-items-center">
          <Link
            to="/checkout"
            className={`btn btn-main-light mt-3 mb-3 w-100 ${cart.length > 0 ? "" : "disabled"
              }`}
          >
            Go to checkout
          </Link>
        </div>
      </div>
    </div>
  );
}
