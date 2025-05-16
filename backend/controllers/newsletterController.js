const { sendTemplatedEmail } = require('../services/emailService');
const { generateNewsletterSubscriptionNotificationTemplate } = require('../services/emailTemplates');
const connection = require('../db/boolshop_db');

function subscribeToNewsletter(req, res) {
  const { email } = req.body;

  // Validate email
  if (!email || !email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
    return res.status(400).json({ error: 'Invalid email address' });
  }

  // Check if email already exists
  const checkSql = 'SELECT * FROM newsletter_subscribers WHERE email = ?';
  connection.query(checkSql, [email], async (err, results) => {
    if (err) {
      console.error('Database error:', err);
      return res.status(500).json({ error: 'Internal server error' });
    }

    if (results.length > 0) {
      return res.status(400).json({ error: 'Email already subscribed' });
    }

    // Insert new subscriber
    const insertSql = 'INSERT INTO newsletter_subscribers (email) VALUES (?)';
    connection.query(insertSql, [email], async (err, result) => {
      if (err) {
        console.error('Database error:', err);
        return res.status(500).json({ error: 'Internal server error' });
      }

      try {
        // Send confirmation email
        const htmlTemplate = generateNewsletterSubscriptionNotificationTemplate(email);
        await sendTemplatedEmail(
          email,
          'Welcome to KickSociety Newsletter!',
          htmlTemplate,
          'Thank you for subscribing to our newsletter!'
        );
      } catch (emailError) {
        console.error('Email sending error:', emailError);
        // Continue even if email fails
      }

      res.status(201).json({
        message: 'Successfully subscribed to newsletter',
        subscriber_id: result.insertId
      });
    });
  });
}

module.exports = {
  subscribeToNewsletter
};