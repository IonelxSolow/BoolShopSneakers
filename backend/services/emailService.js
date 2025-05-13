// backend/services/emailService.js

/**
 * Email Service Module
 * This module handles sending emails using Gmail's OAuth2 authentication via Nodemailer.
 * It uses Google's OAuth2 API to generate an access token for secure email sending.
 */

const nodemailer = require('nodemailer');
const { google } = require('googleapis');

// Environment variables for OAuth2 credentials
const CLIENT_ID = process.env.GOOGLE_CLIENT_ID; // Google OAuth2 Client ID
const CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET; // Google OAuth2 Client Secret
const REDIRECT_URI = process.env.GOOGLE_REDIRECT_URI; // Redirect URI for OAuth2
const REFRESH_TOKEN = process.env.GOOGLE_REFRESH_TOKEN; // Refresh token for generating access tokens

// Initialize OAuth2 client with credentials
const oAuth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);
oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

/**
 * Creates a Nodemailer transporter using OAuth2 authentication.
 * @returns {Promise<import('nodemailer').Transporter>} A promise that resolves to a Nodemailer transporter.
 * @throws Will throw an error if the access token cannot be generated or the transporter fails to initialize.
 */
async function createTransporter() {
  try {
    // Generate an access token using the refresh token
    const accessToken = await oAuth2Client.getAccessToken();

    // Create a Nodemailer transporter with Gmail service and OAuth2 authentication
    const transporter = nodemailer.createTransport({
      service: 'gmail', // Use Gmail as the email service
      auth: {
        type: 'OAuth2', // Authentication type
        user: process.env.EMAIL_USER, // Sender's email address
        clientId: CLIENT_ID, // OAuth2 Client ID
        clientSecret: CLIENT_SECRET, // OAuth2 Client Secret
        refreshToken: REFRESH_TOKEN, // OAuth2 Refresh Token
        accessToken: accessToken.token, // OAuth2 Access Token
      },
    });

    return transporter; // Return the configured transporter
  } catch (error) {
    console.error('Error creating transporter:', error); // Log the error
    throw error; // Rethrow the error for the caller to handle
  }
}

/**
 * Sends an email using the configured transporter.
 * @param {string} to - The recipient's email address.
 * @param {string} subject - The subject of the email.
 * @param {string} text - The plain text content of the email.
 * @param {Object} [options] - Additional email options.
 * @param {string} [options.html] - HTML content for the email.
 * @param {Array} [options.attachments] - Array of attachment objects.
 * @returns {Promise<import('nodemailer').SentMessageInfo>} A promise that resolves to the result of the email sending operation.
 * @throws Will throw an error if the email fails to send.
 */
exports.sendEmail = async (to, subject, text, options = {}) => {
  try {
    // Create the transporter
    const transporter = await createTransporter();

    // Define the email options
    const mailOptions = {
      from: `"KickSociety" <${process.env.EMAIL_USER}>`, // Sender's email address with name
      to, // Recipient's email address
      subject, // Email subject
      text, // Plain text content
      ...options // Additional options like HTML content or attachments
    };

    // Send the email and return the result
    return transporter.sendMail(mailOptions);
  } catch (error) {
    console.error('Error sending email:', error); // Log the error
    throw error; // Rethrow the error for the caller to handle
  }
};

/**
 * Sends an HTML email with a template.
 * @param {string} to - The recipient's email address.
 * @param {string} subject - The subject of the email.
 * @param {string} htmlContent - The HTML content of the email.
 * @param {string} textContent - The plain text fallback content.
 * @returns {Promise<import('nodemailer').SentMessageInfo>} A promise that resolves to the result of the email sending operation.
 */
exports.sendTemplatedEmail = async (to, subject, htmlContent, textContent) => {
  return this.sendEmail(to, subject, textContent, {
    html: htmlContent
  });
};