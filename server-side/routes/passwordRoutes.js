const express = require('express');
const pool = require('../db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const nodemailer = require('nodemailer');


dotenv.config();

const router = express.Router();

// generate a random token
function generateToken() {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
}


function sendEmail({ email, token }) {
  return new Promise((resolve, reject) => {
    var transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.FROM_EMAIL,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    const mailOptions = {
      from: process.env.FROM_EMAIL,
      to: email,
      subject: 'Reset Your Password',
      text: `Click on this link to reset your password: https://car-coach-grad-project.vercel.app/reset/${token}`,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
        return reject({ message: `An error has occurred` });
      }
      return resolve({ message: "Email sent successfully" });
    });
  });
}


// handle forgot password request
router.post('/forgot', async (req, res) => {
  const { email } = req.body;

  // check if user exists
  const user = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
  if (user.rows.length === 0) {
    return res.status(404).send('User not found');
  }

  // generate reset token and expiration time
  const resetToken = generateToken();
  const resetTokenExpiresAt = new Date(Date.now() + 3600000); // expires in 1 hour

  // update user's reset token and expiration time
  await pool.query('UPDATE users SET reset_token= $1, reset_token_expires_at = $2 WHERE email = $3', [
    resetToken,
    resetTokenExpiresAt,
    email,
  ]);

  // send password reset email
  sendEmail({email, token: resetToken});

  res.status(200).send('Password reset email sent');
});

// handle reset password request
router.post('/reset', async (req, res) => {
  try {
      const { token, password } = req.body;

    // check if token is valid and not expired
    const user = await pool.query('SELECT * FROM users WHERE reset_token = $1 AND reset_token_expires_at > $2', [
      token,
      new Date(),
    ]);

    if (user.rows.length === 0) {
      return res.status(400).send('Invalid or expired token');
    }
    if (password.length < 8) {
      return res.status(400).json({ error: 'Password must be at least 8 characters long' });
    }

    // hash the new password
    const hashedPassword = await bcrypt.hash(password, 10);

    // update user's password and reset token
    await pool.query('UPDATE users SET password = $1, reset_token = null, reset_token_expires_at = null WHERE id = $2', [
      hashedPassword,
      user.rows[0].id,
    ]);

    res.status(200).json({message: 'Password reset successfully', id: user.rows[0].id});
  } catch (error) {
    console.error("Internal server error: " + error.message);
  }
  
});

module.exports = router;