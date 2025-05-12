import { Link } from "react-router-dom";
import LatestProducts from "../components/LatestProducts";
import MostPopular from "../components/MostPopular";
import { useState } from "react";
import { useCart } from "../context/CartContext";

export default function CartPage() {
  const { cart, setCart } = useCart();

  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  // Funzione per aumentare la quantità
  function increaseQuantity(sku) {
    const skuIncrease = cart.find((item) => item.sku === sku);
    const updatedCart = cart.map((item) =>
      item.sku === skuIncrease.sku ? { ...item, quantity: item.quantity + 1 } : item
    );
    setCart(updatedCart);
  }

  // Funzione per diminuire la quantità
  function decreaseQuantity(sku) {
    const skuDecrease = cart.find((item) => item.sku === sku);
    const updatedCart = cart.map((item) =>
      item.sku === skuDecrease.sku && item.quantity > 1 ? { ...item, quantity: item.quantity - 1 } : item
    );
    setCart(updatedCart);
  }

  // Funzione per rimuovere un prodotto

 function removeItem(sku) {
  const skuRemove = cart.find((item) => item.sku === sku);
  const updatedCart = cart.filter((item) => item.sku !== skuRemove.sku);

  setCart(updatedCart);
 }

  return (
    <div className="cart-page container my-4">
      {/* Carrello */}
      <h1 className="fs-3 fs-md-2 fw-bold">Your Cart</h1>


      <div className="cart-items mb-4 container rounded-3 p-4" style={{ backgroundColor: "var(--bs-secondary)" }}>
        {cart && cart.length > 0 ? (
          cart.map((item) => (
            <div key={item.sku} className="cart-item card mb-2">
              <div className="card-body d-flex align-items-center">
                <div className="flex-grow-1">
                  <h6>{item.name}</h6>
                  <div className="d-flex flex-column flex-md-row align-items-start align-items-md-center">
                    <span className="mb-2 mb-md-0" style={{ width: "150px" }}>Price: {Number(item.price).toFixed(2)}€</span>
                    <div className="d-flex align-items-center">
                      <button
                        className="btn btn-sm btn-outline-secondary me-2"
                        onClick={() => decreaseQuantity(item.sku)}
                      >
                        -
                      </button>
                      <span>{item.quantity}</span>
                      <button
                        className="btn btn-sm btn-outline-secondary ms-2"
                        onClick={() => increaseQuantity(item.sku)}
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
                <span className="mb-0">Total: {(item.price * item.quantity).toFixed(2)}€</span>
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