var express = require("express");
var db = require("../database");
var Comment = require("../domain/comment");
const router = express.Router();
var VerifyToken = require('./verifyToken');

//handles (get) - return all records
router.get("/", VerifyToken(''), (req, res, next) => {
    console.log("comments served...");
    db.executeQuery(Comment.getAllSQL(req.userType), (err, data) => {
        console.log(data);
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

//handles (post) - add record
router.post("/", VerifyToken('visitor'), (req, res, next) => {
    console.log("req user id:", req.userId);
    let comment = new Comment(req.userId, req.body.content);
    db.query(comment.getAddSQL(), (err, data) => {
        console.log(err);
        res.status(200).json({
            message: "Comment added.",
            Id: data.insertId
        });
    });
});

//handle (get:id) - return one record
router.get("/:Id", (req, res, next) => {
    let id = req.params.Id;
    db.query(Comment.getByIdSQL(id), (err, data) => {
        if (!err) {
            if (data && data.length > 0) {
                res.status(200).json({
                    message: "Comment found.",
                    data: data[0]
                });
            } else {
                res.status(200).json({
                    message: "Comment Not found."
                });
            }
        }
    });
});

//handle (delete) - remove
router.delete("/:id", VerifyToken('admin'), (req, res, next) => {
    var id = req.params.id;
    console.log('delete request');
    db.query(Comment.deleteByIdSQL(id), (err, data) => {
        if (!err) {
            if (data && data.affectedRows > 0) {
                res.status(200).json({
                    message: `Record deleted with id = ${id}.`,
                    affectedRows: data.affectedRows
                });
            } else {
                res.status(200).json({
                    message: "Record Not found."
                });
            }
        }
    });
});

//handles (put) - update
router.put("/", VerifyToken('admin'), (req, res, next) => {
    var id = req.body.id;
    console.log('update route:', req.body);
    db.query(Comment.updateByDataSQL(req.body), (err, data) => {
        console.log(err, data);
        if (!err) {
            if (data && data.affectedRows > 0) {
                res.status(200).json({
                    message: `Record ${id} updated.`,
                    affectedRows: data.affectedRows
                });
            } else {
                res.status(200).json({
                    message: "Record Not found."
                });
            }
        } else {
            res.status(400).json({
                message: "Unknown error :( "
            });
        }
    });
});
module.exports = router;