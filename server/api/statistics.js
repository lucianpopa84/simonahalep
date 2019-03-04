var express = require("express");
var db = require("../database");
var Career = require("../domain/career");
const router = express.Router();
var VerifyToken = require('./verifyToken');

//handles (get) - return all records
router.get("/", (req, res, next) => {
    console.log("career statistics served...");
    db.executeQuery(Career.getAllSQL(), (err, data) => {
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
router.post("/", VerifyToken('admin'), (req, res, next) => {
    let career = new Career(req.body.tournament, req.body.year, req.body.result);
    db.query(careerstatistics.getAddSQL(), (err, data) => {
        console.log(err);
        res.status(200).json({
            message: "Career statistic added.",
            Id: data.insertId
        });
    });
});

//handle (get:id) - return one record
router.get("/:Id", (req, res, next) => {
    let id = req.params.Id;
    db.query(careerstatistics.getByIdSQL(id), (err, data) => {
        if (!err) {
            if (data && data.length > 0) {
                res.status(200).json({
                    message: "Career statistic found.",
                    data: data[0]
                });
            } else {
                res.status(200).json({
                    message: "Career statistic Not found."
                });
            }
        }
    });
});

//handle (delete) - remove
router.delete("/:id", VerifyToken('admin'), (req, res, next) => {
    var id = req.params.id;
    console.log('delete request');
    db.query(careerstatistics.deleteByIdSQL(id), (err, data) => {
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
    db.query(careerstatistics.updateByDataSQL(req.body), (err, data) => {
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