import React from 'react';

export default function Checkout() {
    return (
        <div className="container my-5 bg-light p-4 rounded">
            <div className="row">
                <div className="col-md-7">
                    <h2 className="mb-4 fw-bolder">Checkout</h2>
                    <form>

                        {/* Info Personali */}

                        <div className="mb-4">
                            <h4 className="mb-3">Personal Information</h4>
                            <div className="row g-3">
                                <div className="col-sm-6">
                                    <label htmlFor="firstName" className="form-label">First name</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="firstName"
                                        name="firstName"
                                        required
                                    />
                                </div>
                                <div className="col-sm-6">
                                    <label htmlFor="lastName" className="form-label">Last name</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="lastName"
                                        name="lastName"
                                        required
                                    />
                                </div>
                                <div className="col-12">
                                    <label htmlFor="email" className="form-label">Email</label>
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
                                    <label htmlFor="phone" className="form-label">Phone</label>
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
                                    <label htmlFor="address" className="form-label">Address</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="address"
                                        name="address"
                                        required
                                    />
                                </div>
                                <div className="col-12">
                                    <label htmlFor="city" className="form-label">City</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="city"
                                        name="city"
                                        required
                                    />
                                </div>
                                <div className="col-md-4">
                                    <label htmlFor="state" className="form-label">State</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="state"
                                        name="state"
                                        required
                                    />
                                </div>
                                <div className="col-md-3">
                                    <label htmlFor="zipCode" className="form-label">Zip Code</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="zipCode"
                                        name="zipCode"
                                        required
                                    />
                                </div>
                                <div className="col-md-5">
                                    <label htmlFor="country" className="form-label">Country</label>
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
                            <div className="form-check mb-2">
                                <input
                                    type="radio"
                                    className="form-check-input"
                                    id="standard"
                                    name="shippingMethod"
                                    value="standard"
                                    defaultChecked
                                />
                                <label className="form-check-label" htmlFor="standard">
                                    Standard Shipping (5-7 business days) - $5
                                </label>
                            </div>
                            <div className="form-check">
                                <input
                                    type="radio"
                                    className="form-check-input"
                                    id="express"
                                    name="shippingMethod"
                                    value="express"
                                />
                                <label className="form-check-label" htmlFor="express">
                                    Express Shipping (2-3 business days) - $15
                                </label>
                            </div>
                        </div>

                        {/* Pagamento */}

                        <div className="mb-4">
                            <h4 className="mb-3">Payment Information</h4>
                            <div className="row g-3">
                                <div className="col-12">
                                    <label htmlFor="cardName" className="form-label">Name on card</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="cardName"
                                        name="cardName"
                                        required
                                    />
                                </div>
                                <div className="col-12">
                                    <label htmlFor="cardNumber" className="form-label">Card number</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="cardNumber"
                                        name="cardNumber"
                                        required
                                    />
                                </div>
                                <div className="col-md-6">
                                    <label htmlFor="expiryDate" className="form-label">Expiration date</label>
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
                                    <label htmlFor="cvv" className="form-label">CVV</label>
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

                        <button type="submit" className="btn btn-main-light w-100 mb-4">
                            Place Order
                        </button>
                    </form>
                </div>

                {/* Totale */}

                <div className="col-md-5">
                    <div className="bg-light p-4 rounded shadow-sm mt-4">
                        <h4 className="mb-3">Order Summary</h4>
                        <div className="d-flex justify-content-between mb-2">
                            <span>Subtotal</span>
                            <span>$0.00</span>
                        </div>
                        <div className="d-flex justify-content-between mb-2">
                            <span>Shipping</span>
                            <span>$5.00</span>
                        </div>
                        <hr />
                        <div className="d-flex justify-content-between mb-0">
                            <strong>Total</strong>
                            <strong>$5.00</strong>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}