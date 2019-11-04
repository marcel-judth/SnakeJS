const mongoose = require('mongoose');

const ScoreSchema  = new mongoose.Schema({
    score:{
        type: Number,
        required:true,
        trim: true
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'User'
    },
    createdAt:{
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Score', ScoreSchema);