const mongoose = require('mongoose');

const otpSchema = new mongoose.Schema({
    email: { type: String, required: true },
    dbotp: { type: String, required: true },
    expiresAt: { type: Number, required: true },
    createdAt: { type: Date, default: Date.now }
});

// Delete OTPs after expiration
otpSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

module.exports = mongoose.model('Otp', otpSchema);
