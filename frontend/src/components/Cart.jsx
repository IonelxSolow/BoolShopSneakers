import { Link } from "react-router-dom";

export default function Cart({ toggleCart, isOpen }) {

  const cartItems = [
    // Simulazione di articoli nel carrello (da sostituire con dati reali in futuro)
    { id: 1, name: "Product 1", price: 29.99 },
    { id: 2, name: "Product 2", price: 49.99 },
    { id: 3, name: "Product 3", price: 19.99 },
  ];

  // Calcolo del totale
  const total = cartItems.reduce((acc, item) => acc + item.price * (item.quantity || 1), 0);

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
        {cartItems.length > 0 ? (
          cartItems.map((item) => (
            <div
              key={item.id}
              className="cart-item d-flex justify-content-between align-items-center mb-3"
            >
              <span>{item.name}</span>
              <span>${item.price.toFixed(2)}</span>
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