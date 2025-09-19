const mongoose = require('mongoose');
const { productSchema } = require('./product');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        minlength: [2, 'Name must be at least 2 characters'],
        maxlength: [30, 'Name cannot exceed 30 characters'],
        validate: {
            validator: (value) => /^[a-zA-Z\s]+$/.test(value),
            message: 'Name should contain only alphabets and spaces',
        }
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        validate: {
            validator: (value) => {
                const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                return re.test(value);
            },
            message: 'Please enter a valid email address',
        }
    },
    password: {
        type: String,
        required: true,
        minlength: [6, 'Password must be at least 6 characters'],
        validate: {
            validator: (value) => {
                return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{6,}$/.test(value);
            },
            message: 'Password must contain uppercase, lowercase, number, and special character',
        }
    },
    address: {
        type: String,
        default: '',
    },
    type: {
        type: String,
        default: 'user',
    },

    cart: [
        {
            product : productSchema,
            quantity: {
                type : Number,
                required: true,
            }
        }
    ]
    
}, {
    timestamps: true  // adds createdAt & updatedAt automatically
});

const User = mongoose.model('User', userSchema);

module.exports = User;

