const express = require('express');
const userService = require('../serviceLayer/UserService.js');
const bodyParser = require('body-parser');
var userRouter = express();
userRouter.use(bodyParser.json());

userRouter.get('/', (req, res) => {
    userService.getAllUserSortedByScore((doc) => {
        res.status(200).json(doc);
    }, (error) => {
        res.status(500).json(error);
    })
});

userRouter.post('/', (req, res) => {
    userService.register(req.body.name, req.body.email, req.body.password, (doc) => {
        res.status(200).json(doc);
    }, (error) => {
        res.status(500).json({
            message: error
        });
    });
});

userRouter.post('/login', (req, res) => {
    try {
        userService.login(req.body.username, req.body.password, (doc) => {
            if (!doc) {
                req.session.userId;
                res.status(404).send();
            } else {
                res.status(200).json(doc);
            }
        }, (error) => {
            console.log(error);
            res.status(500).json({
                message: error
            });
        });
    } catch (error) {
        res.status(500).json({
            message: {
                error
            }
        });
    }
});

userRouter.put('/', (req, res) => {
    userService.insertScore(req.body.username, req.body.score, (doc) => {
        if (!doc)
            res.status(404).send();
        else
            res.status(200).json(doc);
    }, (error) => {
        console.log(error);
        res.status(500).json({
            message: error
        });
    });
});

module.exports = userRouter;