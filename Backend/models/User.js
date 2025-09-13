const mongoose = require("mongoose");


const userSchema = new mongoose.Schema({
        name: { type: String, required: true, unique: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        profileImageUrl: { type: String, default: "" },
        role: { type: String, enum: ['member', 'admin'], default: 'user' },
}, { timestamps: true });

module.exports = mongoose.model("User", userSchema);