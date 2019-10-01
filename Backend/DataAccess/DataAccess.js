const mongoose = require('mongoose');
const User = require('../Models/userModel');
const uri = "mongodb+srv://marjudth:Test1234@snakejscluster-uylpq.mongodb.net/SnakeJSUser?retryWrites=true&w=majority";
const collectionName = "Users";
const databaseName = "SnakeJSUser";



module.exports = function () {
    return {
        getAllUsersSortedByScore: _getAllUsersSortedByScore,
        register: _register,
        login: _login,
        insertScore: _insertScore
    }

    function _getAllUsersSortedByScore(sucess, error) {
        try {
            mongoose.connect(uri, { useCreateIndex: true, useNewUrlParser: true, useUnifiedTopology: true });
            User.find({}).sort('scores').exec(function (err, docs) {
                if (err)
                    error(err);
                else
                    sucess(docs);
            });
        } catch (err) {
            error(err);
        }
    }

    function _register(username, password, firstName, lastName, email, sucess, error) {
        try {
            mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
            const userDoc = new User({
                username: username,
                password: password,
                firstName: firstName,
                lastName: lastName,
                email: email,
                scores: []
            });
            userDoc.save()
                .then(result => {
                    sucess(result);
                }).catch(err => {
                    error(err);
                });
        } catch (err) {
            error(err);
        }
    }

    function _login(username, password, sucess, error) {
        try {
            mongoose.connect(uri, { useCreateIndex: true, useNewUrlParser: true, useUnifiedTopology: true });
            User.findOne({ username: username, password: password }, (err, user) => {
                if (err)
                    error(err);
                else
                    sucess(user);
            });
        } catch (err) {
            error(err);
        }
    }

    function _insertScore(username, score, sucess, error) {
        try {
            mongoose.connect(uri, { useCreateIndex: true, useNewUrlParser: true, useUnifiedTopology: true });
            User.updateOne({ username: username }, { $push: { scores: score } }, (err, user) => {
                if(err)
                    error(err);
                else
                    sucess(user);
            });
        } catch (err) {
            error(err);
        }
    }
}();