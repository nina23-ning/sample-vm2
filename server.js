const http = require('http');
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const {VM} = require("vm2");
const vm = new VM();
const app = express();

const server = http.createServer(app);
const port = 5403;

app.use(express.json());
app.use(express.static("express"));
app.use(bodyParser.urlencoded({extended: true}));

app.get('/', function(req, res){
    res.sendFile(path.join(__dirname+'/index.html'));
});

app.post('/', function(req, res){
    console.log(req.body);
    try{
        console.log("Code", req.body.code);
        vm.run(req.body.code);
        res.sendFile(path.join(__dirname+'/success.html'));
        console.log("Success");
    }
    catch(error){
        res.sendFile(path.join(__dirname+'/failure.html'));
        console.log("Error");
    }
});

server.listen(port);

console.debug('Server listening on port ' + port);