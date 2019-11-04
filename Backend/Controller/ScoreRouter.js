const express = require('express');
const router = new express.Router()
const Post = require('../Models/scoreModel')
const { ObjectID } = require('mongodb')

module.exports = router