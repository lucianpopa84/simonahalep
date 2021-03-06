var express = require("express");
var db = require("../database");
var Competition = require("../domain/competition");
const router = express.Router();
var VerifyToken = require('./verifyToken');

//handles (get) - return all records
router.get("/", (req, res, next) => {
    console.log("competitions served...");
    db.executeQuery(Competition.getAllSQL(), (err, data) => {
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

router.get("/future", (req, res, next) => {
    console.log("competitions future served...");
    db.executeQuery(Competition.getAllSQL(future = true), (err, data) => {
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
    let competition = new Competition(req.body.name, req.body.location, req.body.startDate, req.body.endDate, req.body.description);
    let sql = competition.getAddSQL();
    console.log(sql);
    db.query(competition.getAddSQL(), (err, data) => {
        console.log(err);
        res.status(200).json({
            message: "Competition added.",
            Id: data.insertId
        });
    });
});

//handle (get:id) - return one record
router.get("/:Id", (req, res, next) => {
    let id = req.params.Id;
    db.query(Competition.getByIdSQL(id), (err, data) => {
        if (!err) {
            if (data && data.length > 0) {
                res.status(200).json({
                    message: "Competition found.",
                    data: data[0]
                });
            } else {
                res.status(200).json({
                    message: "Competition Not found."
                });
            }
        }
    });
});

//handle (delete) - remove
router.delete("/:id", VerifyToken('admin'), (req, res, next) => {
    var id = req.params.id;
    console.log('delete request');
    db.query(Competition.deleteByIdSQL(id), (err, data) => {
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
    q = Competition.updateByDataSQL(req.body);
    console.log(q);
    db.query(Competition.updateByDataSQL(req.body), (err, data) => {
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