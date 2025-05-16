import { useState, useEffect } from "react";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import { useGlobalContext } from "../context/GlobalContext";
import PaymentForm from "../components/PaymentForm";

export default function Checkout() {
  const { sneakers } = useGlobalContext();
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
  
  // Form validation state
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
  });
  
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  
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

  // Validate individual field
  const validateField = (name, value) => {
    let error = "";
    
    switch(name) {
      case "firstName":
      case "lastName":
      case "state":
        if (!value.trim()) {
          error = "This field is required";
        } else if (value.trim().length < 2) {
          error = "Must be at least 2 characters";
        } else if (!/^[A-Za-z\s]+$/.test(value)) {
          error = "Only letters are allowed";
        }
        break;
        
      case "email":
        if (!value.trim()) {
          error = "Email is required";
        } else if (!/^\S+@\S+\.\S+$/.test(value)) {
          error = "Invalid email format";
        }
        break;
        
      case "phone":
        if (!value.trim()) {
          error = "Phone number is required";
        } else if (!/^\d+$/.test(value)) {
          error = "Only numbers are allowed";
        } else if (value.length < 8 || value.length > 15) {
          error = "Phone number must be between 8 and 15 digits";
        }
        break;
        
      case "address":
        if (!value.trim()) {
          error = "Address is required";
        } else if (value.trim().length < 5) {
          error = "Please enter a complete address";
        }
        break;
        
      case "city":
        if (!value.trim()) {
          error = "City is required";
        } else if (value.trim().length < 2) {
          error = "Must be at least 2 characters";
        }
        break;
        
      case "zipCode":
        if (!value.trim()) {
          error = "Zip code is required";
        } else if (!/^\d+$/.test(value)) {
          error = "Only numbers are allowed";
        } else if (value.length < 5 || value.length > 10) {
          error = "Invalid zip/postal code length";
        }
        break;
        
      case "country":
        if (!value) {
          error = "Please select a country";
        }
        break;
        
      default:
        break;
    }
    
    return error;
  };

  // Handle input changes with additional filtering
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    // Filter input based on field type
    let filteredValue = value;
    
    // Apply filters for specific fields
    if (["firstName", "lastName", "state"].includes(name)) {
      // Allow only letters and spaces
      filteredValue = value.replace(/[^A-Za-z\s]/g, '');
    } else if (["phone", "zipCode"].includes(name)) {
      // Allow only numbers
      filteredValue = value.replace(/[^\d]/g, '');
    }
    
    setFormData({
      ...formData,
      [name]: filteredValue
    });
    
    // Validate field if it's been touched
    if (touched[name]) {
      const error = validateField(name, filteredValue);
      setErrors(prev => ({
        ...prev,
        [name]: error
      }));
    }
  };
  
  // Handle field blur (mark as touched)
  const handleBlur = (e) => {
    const { name, value } = e.target;
    
    setTouched({
      ...touched,
      [name]: true
    });
    
    // Validate on blur
    const error = validateField(name, value);
    setErrors(prev => ({
      ...prev,
      [name]: error
    }));
  };
  
  const handleShippingChange = (e) => {
    setShippingMethod(e.target.value);
  };

  const handlePaymentSuccess = async (paymentIntent) => {
    setIsLoading(true);
    setFormError("");

    try {
      // Crea l'oggetto con i dati dell'ordine
      const orderData = {
        name: `${formData.firstName} ${formData.lastName}`,
        email: formData.email,
        phone: formData.phone,
        address: `${formData.address}, ${formData.city}, ${formData.state} ${formData.zipCode}, ${formData.country}`,
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
        payment_intent_id: paymentIntent.id
      };

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
        const errorData = await response.json();
        throw new Error(errorData.message || "Errore nella risposta del server");
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
        error.message || "Si è verificato un errore durante l'elaborazione dell'ordine. Riprova più tardi."
      );
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } finally {
      setIsLoading(false);
    }
  };

  // Helper function to get form control class
  const getInputClass = (fieldName) => {
    return `form-control ${touched[fieldName] && errors[fieldName] ? 'is-invalid' : (touched[fieldName] && !errors[fieldName] ? 'is-valid' : '')}`;
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
                  className={getInputClass('firstName')}
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  onBlur={handleBlur}
                  placeholder="John"
                  required
                />
                {touched.firstName && errors.firstName && (
                  <div className="invalid-feedback">{errors.firstName}</div>
                )}
              </div>
              <div className="col-sm-6">
                <label htmlFor="lastName" className="form-label">
                  Last name
                </label>
                <input
                  type="text"
                  className={getInputClass('lastName')}
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  onBlur={handleBlur}
                  placeholder="Doe"
                  required
                />
                {touched.lastName && errors.lastName && (
                  <div className="invalid-feedback">{errors.lastName}</div>
                )}
              </div>
              <div className="col-12">
                <label htmlFor="email" className="form-label">
                  Email
                </label>
                <input
                  type="email"
                  className={getInputClass('email')}
                  id="email"
                  name="email"
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={handleInputChange}
                  onBlur={handleBlur}
                  required
                />
                {touched.email && errors.email && (
                  <div className="invalid-feedback">{errors.email}</div>
                )}
              </div>
              <div className="col-12">
                <label htmlFor="phone" className="form-label">
                  Phone
                </label>
                <input
                  type="tel"
                  className={getInputClass('phone')}
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  onBlur={handleBlur}
                  placeholder="e.g., +39 123 456 7890"
                  required
                />
                {touched.phone && errors.phone && (
                  <div className="invalid-feedback">{errors.phone}</div>
                )}
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
                  className={getInputClass('address')}
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  onBlur={handleBlur}
                  placeholder="Via Roma 123"
                  required
                />
                {touched.address && errors.address && (
                  <div className="invalid-feedback">{errors.address}</div>
                )}
              </div>
              <div className="col-12">
                <label htmlFor="city" className="form-label">
                  City
                </label>
                <input
                  type="text"
                  className={getInputClass('city')}
                  id="city"
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  onBlur={handleBlur}
                  placeholder="Milan"
                  required
                />
                {touched.city && errors.city && (
                  <div className="invalid-feedback">{errors.city}</div>
                )}
              </div>
              <div className="col-md-4">
                <label htmlFor="state" className="form-label">
                  State
                </label>
                <input
                  type="text"
                  className={getInputClass('state')}
                  id="state"
                  name="state"
                  value={formData.state}
                  onChange={handleInputChange}
                  onBlur={handleBlur}
                  placeholder="MI"
                  required
                />
                {touched.state && errors.state && (
                  <div className="invalid-feedback">{errors.state}</div>
                )}
              </div>
              <div className="col-md-3">
                <label htmlFor="zipCode" className="form-label">
                  Zip Code
                </label>
                <input
                  type="text"
                  className={getInputClass('zipCode')}
                  id="zipCode"
                  name="zipCode"
                  value={formData.zipCode}
                  onChange={handleInputChange}
                  onBlur={handleBlur}
                  placeholder="20100"
                  required
                />
                {touched.zipCode && errors.zipCode && (
                  <div className="invalid-feedback">{errors.zipCode}</div>
                )}
              </div>
              <div className="col-md-5">
                <label htmlFor="country" className="form-label">
                  Country
                </label>
                <select
                  className={getInputClass('country')}
                  id="country"
                  name="country"
                  value={formData.country}
                  onChange={handleInputChange}
                  onBlur={handleBlur}
                  required
                >
                  <option value="">Choose...</option>
                  <option value="IT">Italy</option>
                  <option value="US">United States</option>
                  <option value="GB">United Kingdom</option>
                </select>
                {touched.country && errors.country && (
                  <div className="invalid-feedback">{errors.country}</div>
                )}
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

          {/* Pagamento con Stripe */}
          <div className="mb-4">
            <h4 className="mb-3">Payment Information</h4>
            <PaymentForm 
              amount={total}
              onPaymentSuccess={handlePaymentSuccess}
            />
          </div>
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
