
var express = require("express");
var bodyparser = require("body-parser");
var cors = require("cors");

var competitions = require("./api/competitions");
var auth = require("./api/adminUsers");
var users = require("./api/users");
var biographies = require("./api/biographies");
const app = express();

app.use(cors());
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: false }));
app.use("/competitions", competitions);
app.use("/adminusers", auth);
app.use("/users", users);
app.use("/biography", biographies);



//if we are here then the specified request is not found
app.use((req, res, next) => {
    const err = new Error("Not Found");
    err.status = 404;
    next(err);
});

//all other requests are not implemented.
app.use((err, req, res, next) => {
    res.status(err.status || 501);
    res.json({
        error: {
            code: err.status || 501,
            message: err.message
        }
    });
});

module.exports = app;
