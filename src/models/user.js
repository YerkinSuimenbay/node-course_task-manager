const { model } = require('mongoose')
const { isEmail } = require('validator')

const User = model('User', {
    name: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        validate(value) {
            if (!isEmail(value)) throw new Error('Invalid email!')
        }
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minLength: 7,
        validate(value) {
            if (value.toLowerCase().includes('password')) throw new Error('Password should not contain "password"')
        }
    }, 
    age: {
        type: Number,
        default: 0,
        validate(value) {
            if (value < 0) throw new Error('Age must be positive number')
        }
    }
})

module.exports = User