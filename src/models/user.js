const { model, Schema } = require('mongoose')
const { isEmail } = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        unique: true,
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
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }]
})

// HASH THE PLAIN TEXT PASSWORD BEFORE SAVING
userSchema.pre('save', async function (next) {
    const user = this
    
    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8)
    }

    next()
})

// LOGIN MIDDLEWARE
userSchema.statics.findByCredentials = async (email, password) => {  // STATUCS ARE AVAILABLE ON THE MODEL
    const user = await User.findOne({ email })
    
    if (!user) throw new Error('Unable to login')

    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) throw new Error('Unable to login')

    return user
}

// GENERATE TOKEN
userSchema.methods.generateAuthToken = async function(rew, res, next) { // METHODS ARE AVAILABLE ON THE INSTANCES
    const user = this
    // const token = jwt.sign({ _id: user._id.toString() }, 'mysecretkey ', { expiresIn: '1 day'})  // .toString() as _id IS AN OBJECTID TYPE
    const token = jwt.sign({ _id: user._id.toString() }, 'mysecretkey')  // .toString() as _id IS AN OBJECTID TYPE
    user.tokens = user.tokens.concat({ token })
    await user.save()
    return token
}

const User = model('User', userSchema)

module.exports = User