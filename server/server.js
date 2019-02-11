var http = require("http");
var app = require("./app");

//Use system configuration for port or use 8080 by default.
const port = process.env.port || 8080;

//Create server with exported express app
const server = http.createServer(app);
server.listen(port);
console.log('server started on port 8080');