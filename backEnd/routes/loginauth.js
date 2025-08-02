const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../models/users');
const Otp = require('../models/otps');
const nodemailer = require('nodemailer');
const crypto = require('crypto');
const bcrypt = require('bcryptjs');
require('dotenv').config();

// Signup API
router.post('/signup', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Validate input
    if (!name || !email || !password) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already exists' });
    }

    // Create new user
    const user = new User({ name, email, password });
    await user.save();

    res.status(201).json({
      message: 'User created successfully',
      user: {
        id: user._id,
        name: user.name,
        email: user.email
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Login API
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }
    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    // Verify password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    // Generate JWT
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: '1d'
    });

    res.json({
      message: 'Login successful',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Configure Nodemailer transporter
const transporter = nodemailer.createTransport({
  service: 'gmail', // or your email service
  auth: {
    user: process.env.EMAIL_USER, // Your email
    pass: process.env.EMAIL_PASS, // Your email password or app-specific password
  }
});

// ForgotPassword API
router.post('/forgotpassword', async (req, res) => {
  try {
    const { email } = req.body;
    console.log("EMAIL_USER:", process.env.EMAIL_USER);
    console.log("EMAIL_PASS:", process.env.EMAIL_PASS ? "Loaded" : "Missing");
    // Validate input
    if (!email) {
      return res.status(400).json({ message: 'Email is required!' });
    }
    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Email is not registered!' });
    }
    // Generate OTP
    const otpCode = crypto.randomInt(100000, 999999).toString();
    const otpExpires = Date.now() + 10 * 60 * 1000; // OTP valid for 10 minutes
    // Create new OTP record
    const otp = new Otp({
      email,
      dbotp: otpCode,
      expiresAt: otpExpires
    });
    await otp.save();
    // Send OTP via email
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Password Reset OTP',
      text: `Your OTP for password reset is: ${otpCode}. It is valid for 10 minutes.`
    };
    //send OTP
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: 'OTP sent to your email!' });
  }
  catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// OTP Validation
router.post('/verifyotp', async (req, res) => {
  try {
    const { email, otpvalue } = req.body;
    // Validate input
    if (!email || !otpvalue) {
      return res.status(400).json({ message: 'OTP is required!' });
    }
    // Find user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'Email is not registered!' });
    }
    // Find the latest OTP record for the email
    const otp = await Otp.findOne({ email }).sort({ createdAt: -1 });
    if (!otp) {
      return res.status(404).json({ message: 'No OTP found for this email!' });
    }
    // Verify OTP
    if (otp.dbotp !== otpvalue || otp.expiresAt < Date.now()) {
      return res.status(400).json({ message: 'Invalid or expired OTP!' });
    }
    res.status(200).json({ message: 'OTP verified successfully!' });
  }
  catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Password Reset
router.post('/resetpassword', async (req, res) => {
  try {
    const { email, otpvalue, newpassword } = req.body;
    // Validate input
    if (!email || !otpvalue || !newpassword) {
      return res.status(400).json({ message: 'New Password is required!' });
    }
    // Find user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'Email is not registered!' });
    }
    // Find the latest OTP record for the email
    const otp = await Otp.findOne({ email }).sort({ createdAt: -1 });
    if (!otp) {
      return res.status(404).json({ message: 'No OTP found for this email!' });
    }
    // Verify OTP
    if (otp.dbotp !== otpvalue || otp.expiresAt < Date.now()) {
      return res.status(400).json({ message: 'Invalid or expired OTP!' });
    }
    // Hash new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newpassword, salt);
    // Update password directly in the database
    await User.findOneAndUpdate(
      { email },
      { $set: { password: hashedPassword } },
      { new: true }
    );
    await Otp.deleteOne({ _id: otp._id });
    res.status(200).json({ message: 'Password reset successfully!' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
})

module.exports = router;