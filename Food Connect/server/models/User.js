const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    Name: {
        type: String,
        required: [true, "Name is required"],
        trim: true,
        minlength: [3, "Name must be at least 3 characters long"],
        maxlength: [50, "Name cannot exceed 50 characters"]
    },
    Address: {
        type: String,
        required: [true, "Address is required"],
        trim: true,
        minlength: [10, "Address must be at least 10 characters long"]
    },
    Contact: {
        type: Number,
        unique: true,
        required: [true, "Contact number is required"],
        validate: {
            validator: function (v) {
                return /^[6-9]\d{9}$/.test(v.toString());
            },
            message: "Invalid Indian contact number"
        }
    },
    Email: {
        type: String,
        unique: true,
        required: [true, "Email is required"],
        unique: true,
        lowercase: true,
        trim: true,
        match: [/^\S+@\S+\.\S+$/, "Invalid email format"]
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        minlength: [6, "Password must be at least 6 characters long"]
    },
    AadharNumber: {
        type: Number,
        required: [true, "Aadhar Number is required"],
        unique: true,
        validate: {
            validator: function (v) {
                return /^\d{12}$/.test(v.toString());
            },
            message: "Aadhar Number must be exactly 12 digits"
        }
    },
    role: {
        type: String,
        enum: ['Resturent', 'NGO', 'Individual'],
        required: [true, "Role is required"]
    }
});

const UserModel = mongoose.model('User', UserSchema);
module.exports = UserModel;
