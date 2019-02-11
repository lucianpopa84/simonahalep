// AuthController.js
var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var db = require("../database");
var AdminUser = require("../domain/adminuser");
var config = require('../config');

router.post('/register', function (req, res) {
    console.log("intra");
    var hashedPassword = bcrypt.hashSync(req.body.password, 8);
    let adminUser = new AdminUser(req.body.username, hashedPassword);
    db.query(adminUser.getAddSQL(), (err, data) => {
        if (err) return res.status(500).send("There was a problem registering the user.")
        var token = jwt.sign({ id: data.insertId }, config.secret, { expiresIn: 86400 });// expires in 24 hours
        res.status(200).json({
            message: "AdminUser added.",
            auth: true,
            token: token
        });
    });

});

var VerifyToken = require('./verifyToken');

router.get('/me', VerifyToken, function (req, res) {
    var token = req.headers['x-access-token'];
    if (!token) return res.status(401).send({ auth: false, message: 'No token provided.' });

    jwt.verify(token, config.secret, function (err, decoded) {
        if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });

        res.status(200).send(decoded);
    });
});

router.post('/login', function (req, res) {
    console.log('login route:', req.body);
    db.query(AdminUser.getByUserNameSQL(req.body.username), (err, data) => {
        let user = data[0];
        console.log(err, "user:", user);
        if (err) return res.status(500).send('Error on the server.');
        if (!user) return res.status(404).send('No user found.');
        var passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
        if (!passwordIsValid) return res.status(401).send({ auth: false, token: null });
        var token = jwt.sign({ id: user.id }, config.secret, {
            expiresIn: 86400 // expires in 24 hours
        });
        res.status(200).send({ auth: true, token: token });
    });
});

// AuthController.js
router.get('/logout', function (req, res) {
    res.status(200).send({ auth: false, token: null });
});
module.exports = router;