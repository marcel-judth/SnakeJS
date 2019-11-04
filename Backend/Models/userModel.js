const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const validator = require('validator')


const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Email is invalid!')
            }
        }
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minlength: 7,
        validate(value) {
            if (validator.isEmpty(value)) {
                throw new Error('Please enter your password!')
            } else if (validator.equals(value.toLowerCase(), "password")) {
                throw new Error('Password is invalid!')
            } else if (validator.contains(value.toLowerCase(), "password")) {
                throw new Error('Password should not contain password!')
            }
        }
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }],
    createdAt: {
        type: Date,
        default: Date.now
    }
});

userSchema.pre('save', function (next) {
    var user = this;
    bcrypt.hash(user.password, 10, function (err, hash) {
        if (err) {
            return next(err);
        }
        user.password = hash;
        next();
    })
});

userSchema.methods.newAuthToken = async function () {
    const user = this;
    const token = jwt.sign({ _id: user.id.toString() }, 'thisismynewblog', { expiresIn: "7 days" });
    user.tokens = user.tokens.concat({ token });
    await user.save();
    return token;
}

module.exports = mongoose.model('User', userSchema);