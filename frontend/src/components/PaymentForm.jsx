import { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';





const PaymentForm = ({ amount, onPaymentSuccess }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState(null);
  const [processing, setProcessing] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setProcessing(true);

    if (!stripe || !elements) {
      return;
    }

    try {
      // 1. Crea il PaymentIntent
      const response = await fetch('http://localhost:3000/boolshop/api/v1/payments/create-payment-intent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ amount }),
      });

      const { clientSecret } = await response.json();

      // 2. Conferma il pagamento
      const { error: stripeError, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      });

      if (stripeError) {
        setError(stripeError.message);
      } else if (paymentIntent.status === 'succeeded') {
        onPaymentSuccess(paymentIntent);
      }
    } catch (err) {
      setError('Si è verificato un errore durante il pagamento');
      console.error('Errore:', err);
    }

    setProcessing(false);
  };

  return (
    <form onSubmit={handleSubmit} className="payment-form">
      <div className="form-group">
        <CardElement
          options={{
            style: {
              base: {
                fontSize: '16px',
                color: '#424770',
                '::placeholder': {
                  color: '#aab7c4',
                },
              },
              invalid: {
                color: '#9e2146',
              },
            },
          }}
        />
      </div>
      
      {error && <div className="error-message">{error}</div>}
      
      <button
        type="submit"
        disabled={!stripe || processing}
        className="btn btn-primary mt-3"
      >
        {processing ? 'Elaborazione...' : `Paga €${amount.toFixed(2)}`}
      </button>
    </form>
  );
};

// Wrapper component per fornire Stripe Elements
const PaymentFormWrapper = (props) => {
  return (
    <div className="payment-form-container">
      <h3>Dettagli Pagamento</h3>
      <PaymentForm {...props} />
    </div>
  );
};

export default PaymentFormWrapper; 