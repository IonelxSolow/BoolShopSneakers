import { useState, useEffect } from "react";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import { useGlobalContext } from "../context/GlobalContext";

export default function Checkout() {
  const { sneakers } = useGlobalContext()
  const { cart, setCart } = useCart();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [formError, setFormError] = useState("");
  const [shippingConfig, setShippingConfig] = useState({
    free_shipping_threshold: 100,
    shipping_costs: {
      standard: 5,
      express: 15
    }
  });
  
  useEffect(() => {
    // Fetch shipping configuration from the backend
    const fetchShippingConfig = async () => {
      try {
        const response = await fetch(
          "http://localhost:3000/boolshop/api/v1/config/shipping"
        );
        
        if (response.ok) {
          const config = await response.json();
          setShippingConfig(config);
        }
      } catch (error) {
        console.error("Error fetching shipping configuration:", error);
        // Use default values if fetch fails
      }
    };
    
    fetchShippingConfig();
  }, []);
  
  // Calcola il totale
  const subtotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  
  // Free shipping threshold from config
  const FREE_SHIPPING_THRESHOLD = shippingConfig.free_shipping_threshold;
  
  // Calculate if shipping is free
  const isFreeShipping = subtotal >= FREE_SHIPPING_THRESHOLD;
  const [shippingMethod, setShippingMethod] = useState("standard");
  
  // Calculate shipping cost
  const shippingCost = isFreeShipping ? 0 : 
    (shippingMethod === "express" ? 
      shippingConfig.shipping_costs.express : 
      shippingConfig.shipping_costs.standard);
  
  const total = subtotal + shippingCost;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setFormError("");

    // Validazione semplice
    if (cart.length === 0) {
      setFormError(
        "Il carrello è vuoto. Aggiungi articoli prima di procedere al checkout."
      );
      setIsLoading(false);
      return;
    }

    // Raccogli i dati dal form
    const formData = new FormData(e.target);

    // Crea l'oggetto con i dati dell'ordine
    const orderData = {
      name: `${formData.get("firstName")} ${formData.get("lastName")}`,
      email: formData.get("email"),
      phone: formData.get("phone"),
      address: `${formData.get("address")}, ${formData.get(
        "city"
      )}, ${formData.get("state")} ${formData.get("zipCode")}, ${formData.get(
        "country"
      )}`,
      total_price: total,
      status: "pending",
      payment_type: "card",
      delivery_fee: shippingCost,
      shipping_method: shippingMethod,
      items: cart.map((item) => ({
        variant_id: item.variant_id,
        quantity: item.quantity,
        price: item.price,
      })),
    };

    try {
      const response = await fetch(
        "http://localhost:3000/boolshop/api/v1/orders",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(orderData),
        }
      );

      if (!response.ok) {
        throw new Error("Errore nella risposta del server");
      }

      const data = await response.json();

      // Ordine creato con successo
      console.log("Ordine creato con successo:", data);

      // Svuota il carrello
      setCart([]);

      // Reindirizza alla pagina di conferma
      navigate("/order-confirmation", {
        state: {
          orderId: data.purchase_order,
          customerName: orderData.name,
          total: data.total_price || total,
          freeShipping: data.free_shipping,
        },
      });
    } catch (error) {
      console.error("Errore durante la creazione dell'ordine:", error);
      setFormError(
        "Si è verificato un errore durante l'elaborazione dell'ordine. Riprova più tardi."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleShippingChange = (e) => {
    setShippingMethod(e.target.value);
  };

  return (
    <div className="container my-5 bg-light p-4 rounded">
      {formError && (
        <div className="alert alert-danger" role="alert">
          {formError}
        </div>
      )}

      <div className="row">
        <div className="col-md-7">
          <h2 className="mb-4 fw-bolder">Checkout</h2>
          <form onSubmit={handleSubmit}>
            {/* Info Personali */}
            <div className="mb-4">
              <h4 className="mb-3">Personal Information</h4>
              <div className="row g-3">
                <div className="col-sm-6">
                  <label htmlFor="firstName" className="form-label">
                    First name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="firstName"
                    name="firstName"
                    required
                  />
                </div>
                <div className="col-sm-6">
                  <label htmlFor="lastName" className="form-label">
                    Last name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="lastName"
                    name="lastName"
                    required
                  />
                </div>
                <div className="col-12">
                  <label htmlFor="email" className="form-label">
                    Email
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    name="email"
                    placeholder="you@example.com"
                    required
                  />
                </div>
                <div className="col-12">
                  <label htmlFor="phone" className="form-label">
                    Phone
                  </label>
                  <input
                    type="tel"
                    className="form-control"
                    id="phone"
                    name="phone"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Spedizione */}
            <div className="mb-4">
              <h4 className="mb-3">Shipping Address</h4>
              <div className="row g-3">
                <div className="col-12">
                  <label htmlFor="address" className="form-label">
                    Address
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="address"
                    name="address"
                    required
                  />
                </div>
                <div className="col-12">
                  <label htmlFor="city" className="form-label">
                    City
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="city"
                    name="city"
                    required
                  />
                </div>
                <div className="col-md-4">
                  <label htmlFor="state" className="form-label">
                    State
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="state"
                    name="state"
                    required
                  />
                </div>
                <div className="col-md-3">
                  <label htmlFor="zipCode" className="form-label">
                    Zip Code
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="zipCode"
                    name="zipCode"
                    required
                  />
                </div>
                <div className="col-md-5">
                  <label htmlFor="country" className="form-label">
                    Country
                  </label>
                  <select
                    className="form-select"
                    id="country"
                    name="country"
                    required
                  >
                    <option value="">Choose...</option>
                    <option value="IT">Italy</option>
                    <option value="US">United States</option>
                    <option value="GB">United Kingdom</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="mb-4">
              <h4 className="mb-3">Shipping Method</h4>
              {!isFreeShipping && (
                <div className="alert alert-info mb-3">
                  <small>
                    Add €{(FREE_SHIPPING_THRESHOLD - subtotal).toFixed(2)} more to your order for FREE shipping!
                  </small>
                </div>
              )}
              <div className="form-check mb-2">
                <input
                  type="radio"
                  className="form-check-input"
                  id="standard"
                  name="shippingMethod"
                  value="standard"
                  checked={shippingMethod === "standard"}
                  onChange={handleShippingChange}
                />
                <label className="form-check-label" htmlFor="standard">
                  Standard Shipping (5-7 business days) - {isFreeShipping ? (
                    <span className="text-success fw-bold">FREE</span>
                  ) : (
                    `€${shippingConfig.shipping_costs.standard}`
                  )}
                </label>
              </div>
              <div className="form-check">
                <input
                  type="radio"
                  className="form-check-input"
                  id="express"
                  name="shippingMethod"
                  value="express"
                  checked={shippingMethod === "express"}
                  onChange={handleShippingChange}
                />
                <label className="form-check-label" htmlFor="express">
                  Express Shipping (2-3 business days) - {isFreeShipping ? (
                    <span className="text-success fw-bold">FREE</span>
                  ) : (
                    `€${shippingConfig.shipping_costs.express}`
                  )}
                </label>
              </div>
            </div>

            {/* Pagamento */}
            <div className="mb-4">
              <h4 className="mb-3">Payment Information</h4>
              <div className="row g-3">
                <div className="col-12">
                  <label htmlFor="cardName" className="form-label">
                    Name on card
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="cardName"
                    name="cardName"
                    required
                  />
                </div>
                <div className="col-12">
                  <label htmlFor="cardNumber" className="form-label">
                    Card number
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="cardNumber"
                    name="cardNumber"
                    required
                  />
                </div>
                <div className="col-md-6">
                  <label htmlFor="expiryDate" className="form-label">
                    Expiration date
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="expiryDate"
                    name="expiryDate"
                    placeholder="MM/YY"
                    required
                  />
                </div>
                <div className="col-md-6">
                  <label htmlFor="cvv" className="form-label">
                    CVV
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="cvv"
                    name="cvv"
                    required
                  />
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="btn btn-main-light w-100 mb-4"
              disabled={isLoading}
            >
              {isLoading ? "Elaborazione in corso..." : "Place Order"}
            </button>
          </form>
        </div>

        {/* Totale */}
        <div className="col-md-5">
          <div className="bg-white p-4 rounded shadow-sm mt-4">
            <h4 className="mb-3">Order Summary</h4>
            {cart.length > 0 ? (
              <>
                {cart.map((item, index) => (
                  <div
                    key={index}
                    className="d-flex justify-content-between mb-2"
                  >
                    <span>
                      {item.name} - {item.size} ({item.quantity}x)
                    </span>
                    <span>€{(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
                <hr />
                <div className="d-flex justify-content-between mb-2">
                  <span>Subtotal</span>
                  <span>€{subtotal.toFixed(2)}</span>
                </div>
                <div className="d-flex justify-content-between mb-2">
                  <span>Shipping</span>
                  <span>{isFreeShipping ? <span style={{ color: '#4caf50', fontWeight: 600 }}>Free</span> : `€${shippingCost.toFixed(2)}`}</span>
                </div>
                <hr />
                <div className="d-flex justify-content-between mb-0">
                  <strong>Total</strong>
                  <strong>€{total.toFixed(2)}</strong>
                </div>
              </>
            ) : (
              <p className="text-center">Il carrello è vuoto</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
