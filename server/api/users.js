var express = require("express");
var db = require("../database");
var User = require("../domain/user");
//authorisation auth0
var ejwt = require('express-jwt');
var jwks = require('jwks-rsa');

var jwt = require('jsonwebtoken');
var config = require('../config');
var jwtCheck = ejwt({
    secret: jwks.expressJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: config.auth0Domain + ".well-known/jwks.json"
    }),
    audience: 'firstapi',
    issuer: config.auth0Domain,
    algorithms: ['RS256']
});
var VerifyToken = require('./verifyToken');

const router = express.Router();

function returnToken(res, user) {
    var token = jwt.sign({ id: user.id, type: 'visitor' }, config.secret, {
        expiresIn: 86400 // expires in 24 hours
    });
    res.status(200).send({ auth: true, token: token, user: user });
}

//handles url http://localhost:6001/students/ (post)
router.post("/", jwtCheck, (req, res, next) => {
    let sub = req.body.sub;
    let q = User.getBySubSQL(sub);
    console.log("query:", q);
    db.query(User.getBySubSQL(sub), (err, data) => {
        console.log(err, data);
        if (data[0]) {
            returnToken(res, data[0].id);
        } else {
            let user = new User(req.body.sub, req.body.name, req.body.nickname, req.body.picture);
            db.query(user.getAddSQL(), (err, data) => {
                console.log(err);
                user.id = data.insertId;
                returnToken(res, user);
            });
        }
    });

});

//handles (get) - return all records
router.get("/", VerifyToken('admin'), (req, res, next) => {
    console.log("users served...");
    db.executeQuery(User.getAllSQL(), (err, data) => {
        if (!err) {
            res.json({
                success: true,
                data
            });
        } else {
            res.send('<h1>no mysql</h1>');
        }
    });
});
//handles  (get) one
router.get("/:Id", VerifyToken('admin'), (req, res, next) => {
    let id = req.params.Id;

    db.query(User.getByIdSQL(id), (err, data) => {
        if (!err) {
            if (data && data.length > 0) {
                res.status(200).json({
                    message: "user found.",
                    student: data[0]
                });
            } else {
                res.status(200).json({
                    message: "User Not found."
                });
            }
        }
    });
});

//handles  (delete)
router.delete("/:id", VerifyToken('admin'), (req, res, next) => {

    var id = req.params.id;
    console.log('delete request');
    db.query(User.deleteStudentByIdSQL(id), (err, data) => {
        if (!err) {
            if (data && data.affectedRows > 0) {
                res.status(200).json({
                    message: `user deleted with id = ${id}.`,
                    affectedRows: data.affectedRows
                });
            } else {
                res.status(200).json({
                    message: "User Not found."
                });
            }
        }
    });
});

//handles  (put) - update
router.put("/", VerifyToken('admin'), (req, res, next) => {

    var sub = req.body.sub;
    console.log('body:', req.body);
    q = User.updateByDataSQL(req.body);
    console.log("q:", q);
    db.query(User.updateByDataSQL(req.body), (err, data) => {
        if (!err) {
            if (data && data.affectedRows > 0) {
                res.status(200).json({
                    message: `User ${sub} updated.`,
                    affectedRows: data.affectedRows
                });
            } else {
                res.status(200).json({
                    message: "User Not found."
                });
            }
        }
    });
});
module.exports = router;