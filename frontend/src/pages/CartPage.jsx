import { Link } from "react-router-dom";
import LatestProducts from "../components/LatestProducts";
import MostPopular from "../components/MostPopular";

export default function CartPage() {
  const cartItems = [
    { id: 1, name: "Product 1", price: 29.99, quantity: 1 },
    { id: 2, name: "Product 2", price: 49.99, quantity: 2 },
    { id: 3, name: "Product 3", price: 19.99, quantity: 1 },
  ];

  const total = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const recommendedItems = [
    { id: 4, name: "Recommended 1", price: 39.99, image: "/assets/recommended1.jpg" },
    { id: 5, name: "Recommended 2", price: 59.99, image: "/assets/recommended2.jpg" },
    { id: 6, name: "Recommended 3", price: 79.99, image: "/assets/recommended3.jpg" },
  ];

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
          <button className="btn btn-main-light">Proceed to checkout</button>
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