import { Link } from "react-router-dom";

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
    <div className="cart-page container my-5">
      {/* Carrello */}
      <h1 className="mb-4">Il tuo carrello</h1>
      <div className="cart-items mb-4">
        {cartItems.length > 0 ? (
          cartItems.map((item) => (
            <div key={item.id} className="cart-item card mb-2">
              <div className="card-body d-flex align-items-center">
                <div className="flex-grow-1">
                  <h6>{item.name}</h6>
                  <div className="d-flex flex-column flex-md-row align-items-start align-items-md-center">
                    <span className="me-md-3 mb-2 mb-md-0">Prezzo: {item.price.toFixed(2)}€</span>
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
                <span className="mb-0">Totale: {(item.price * item.quantity).toFixed(2)}€</span>
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
          <p>Il tuo carrello è vuoto.</p>
        )}
      </div>

      {/* Totale */}
      <div className="cart-total d-flex justify-content-between align-items-center mb-5">
        <h5>Totale: {total.toFixed(2)}€</h5>
        <button className="btn btn-main-light">Procedi al checkout</button>
      </div>

      {/* Hero Section */}
      <div className="hero-section text-center py-5 mb-5" style={{ backgroundColor: "#f8f9fa" }}>
        <h2 className="mb-3">Scopri le ultime novità</h2>
        <p className="mb-4">Trova i prodotti perfetti per te nella nostra collezione esclusiva.</p>
        <Link to="/all-products" className="btn btn-main-light">
          Esplora ora
        </Link>
      </div>

      {/* Ti potrebbe interessare */}
      <div className="recommended-section">
        <h2 className="mb-4">Ti potrebbe interessare</h2>
        <div className="row">
          {recommendedItems.map((item) => (
            <div key={item.id} className="col-12 col-md-4 mb-4">
              <div className="recommended-item card">
                <img src={item.image} className="card-img-top" alt={item.name} />
                <div className="card-body text-center">
                  <h6 className="card-title">{item.name}</h6>
                  <p className="card-text">{item.price.toFixed(2)}€</p>
                  <Link to={`/product/${item.id}`} className="btn btn-main-light">
                    Scopri di più
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}