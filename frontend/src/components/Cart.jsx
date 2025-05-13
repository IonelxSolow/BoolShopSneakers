import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

export default function Cart({ toggleCart, isOpen }) {

  const { cart, increaseQuantity, decreaseQuantity, removeItem, total } = useCart();

  return (
    <div className={`cart-content d-flex flex-column ${isOpen ? "open" : ""}`}>
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

      <h5 className="mb-3">Your Cart</h5>

      <div className="cart-items">
        {cart.length > 0 ? (
          cart.map((item) => (
            <div
              key={item.sku}
              className="cart-item d-flex justify-content-between align-items-center mb-3"
            >
              <span>{item.name}</span>
              <span>${Number(item.price).toFixed(2)}</span>
            </div>
          ))
        ) : (
          <p>Your cart is empty</p>
        )}
      </div>

      {/* Totale */}
      <div className="mt-auto">
        <h6 className="d-flex justify-content-between">
          <span>Total:</span>
          <span>{total}€</span>
        </h6>
        <Link to="/checkout" className="btn btn-main-light w-100 mt-3">
          Procede to checkout
        </Link>
      </div>
    </div>
  );
}