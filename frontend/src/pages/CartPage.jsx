import { Link } from "react-router-dom";
import LatestProducts from "../components/LatestProducts";
import MostPopular from "../components/MostPopular";
import { useState } from "react";

export default function CartPage() {
  const [cartItems, setCartItems] = useState([
    { id: 1, name: "Product 1", price: 29.99, quantity: 1 },
    { id: 2, name: "Product 2", price: 49.99, quantity: 2 },
    { id: 3, name: "Product 3", price: 19.99, quantity: 1 },
  ]);

  const total = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  // Funzione per aumentare la quantità
  const increaseQuantity = (id) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  // Funzione per diminuire la quantità
  const decreaseQuantity = (id) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  // Funzione per rimuovere un prodotto
  const removeItem = (id) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  return (
    <div className="cart-page container my-4">
      {/* Carrello */}
      <h1 className="fs-3 fs-md-2 fw-bold">Your Cart</h1>
      <div className="cart-items mb-4 container rounded-3 p-4" style={{ backgroundColor: "var(--bs-secondary)" }}>
        {cartItems.length > 0 ? (
          cartItems.map((item) => (
            <div key={item.id} className="cart-item card mb-2">
              <div className="card-body d-flex align-items-center">
                <div className="flex-grow-1">
                  <h6>{item.name}</h6>
                  <div className="d-flex flex-column flex-md-row align-items-start align-items-md-center">
                    <span className="mb-2 mb-md-0" style={{ width: "150px" }}>Price: {item.price.toFixed(2)}€</span>
                    <div className="d-flex align-items-center">
                      <button
                        className="btn btn-sm btn-outline-secondary me-2"
                        onClick={() => decreaseQuantity(item.id)}
                      >
                        -
                      </button>
                      <span>{item.quantity}</span>
                      <button
                        className="btn btn-sm btn-outline-secondary ms-2"
                        onClick={() => increaseQuantity(item.id)}
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
                <span className="mb-0">Total: {(item.price * item.quantity).toFixed(2)}€</span>
                <button
                  className="btn btn-sm btn-danger ms-3"
                  onClick={() => removeItem(item.id)}
                >
                  <i class="bi bi-trash"></i>
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>Your cart is empty.</p>
        )}


        {/* Totale */}
        <div className="cart-total d-flex justify-content-between align-items-center text-light mt-3">
          <h5 className="m-0">Total: {total.toFixed(2)}€</h5>
          <button className="btn btn-main-light">Go to checkout</button>
        </div>
      </div>


      {/* Hero Section */}
      <div className="home-displayer mt-5">

        <LatestProducts />
        <MostPopular />
      </div>
    </div>
  )
}