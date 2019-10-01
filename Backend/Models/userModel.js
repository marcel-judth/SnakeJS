const mongoose = require('mongoose');


const userSchema = mongoose.Schema ({
    username : {
        type : String,
        unique : true
    },
    password : {
        type : String
    },
    firstName : {
        type : String
    },
    lastName : {
        type : String
    },
    email : {
        type : String
    },
    scores : {
        type : Array
    }
});

module.exports = mongoose.model('User', userSchema);