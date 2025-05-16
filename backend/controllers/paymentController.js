const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);



// Crea un nuovo PaymentIntent
const createPaymentIntent = async (req, res) => {
  try {
    const { amount, currency = 'eur' } = req.body;

    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100), // Stripe usa i centesimi, serve un intero!
      currency: currency,
      automatic_payment_methods: {
        enabled: true,
      },
    });

    console.log('PaymentIntent:', paymentIntent);

    res.json({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    console.error('Errore nella creazione del PaymentIntent:', error);
    res.status(500).json({ error: error.message });
  }
};

// Conferma un pagamento esistente
const confirmPayment = async (req, res) => {
  try {
    const { paymentIntentId } = req.body;
    
    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);
    
    res.json({
      status: paymentIntent.status,
      amount: paymentIntent.amount,
    });
  } catch (error) {
    console.error('Errore nella conferma del pagamento:', error);
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createPaymentIntent,
  confirmPayment
}; 