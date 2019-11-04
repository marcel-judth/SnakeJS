const mongoose = require('mongoose');
const User = require('../Models/userModel');
const bcrypt = require('bcrypt');
const uri = "mongodb://admin:S0a1RaLxcxwaPAQm@SG-SnakeJSCluster-26663.servers.mongodirector.com:27017/admin";

mongoose.connect(uri, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useCreateIndex: true
}).then(() => {
    console.log('connected to database');
}).catch((err) => {
    console.log('failed connected to database' + err);
});

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
            User.find({}).sort({ scores: -1 }).exec(function (err, docs) {
                if (err)
                    error(err);
                else
                    sucess(docs);
            });
        } catch (err) {
            error(err);
        }
    }

    function _register(name, email, password, sucess, error) {
        try {
            // mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
            const userDoc = new User({
                name: name,
                email: email,
                password: password,
            });
            const token = await userDoc.newAuthToken();
            sucess({
                user: userDoc,
                token: token
            });
        } catch (err) {
            error(err);
        }
    }

    function _login(username, password, sucess, error) {
        try {
            mongoose.connect(uri, connOptions);
            User.findOne({ username: username }, (err, user) => {
                if (err)
                    error(err);
                else if (user)
                    bcrypt.compare(password, user.password, function (err, result) {
                        if (err)
                            error(err);
                        if (result === true)
                            return sucess(user);
                        else
                            return error('wrong data');
                    });
                else
                    err('User not found.');
            });
        } catch (err) {
            error(err);
        }
    }

    function _insertScore(username, score, sucess, error) {
        try {
            mongoose.connect(uri, { useCreateIndex: true, useNewUrlParser: true, useUnifiedTopology: true });
            User.updateOne({ username: username }, { $push: { scores: score } }, (err, user) => {
                if (err)
                    error(err);
                else
                    sucess(user);
            });
        } catch (err) {
            error(err);
        }
    }
}();