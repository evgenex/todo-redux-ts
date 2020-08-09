const express = require('express');
const db = require('./db');

let lists = express.Router();


lists.get('/', (req, res)=> {
  db.all('SELECT name FROM lists', (err, result)=> {
    if(err) {
        res.type('application/json');
        res.send({
            status: 'err',
            result: err,
        });
    }
    else{
        res.type('application/json');
        res.send({
            status: 'OK',
            result: result,
        });
    }      
    }); 
});

lists.post('/insert', function(req, res) {
    db.run(`INSERT INTO lists (name) VALUES ('${req.body.name}')`, 
        function (err, result) {
        if(err) {
            res.type('application/json');
            res.send({
                status: 'err',
                result: err,
            });
        }
        else{
            res.type('application/json');
            res.send({
                status: 'OK',
                result: result,
            });
        }      
    }); 
});

lists.post('/delete', function(req, res) {
    db.run(`DELETE FROM lists WHERE name = '${req.body.name}'`, 
        function (err, result) {
        if(err) {
            res.type('application/json');
            res.send({
                status: 'err',
                result: err,
            });
        }
        else{
            res.type('application/json');
            res.send({
                status: 'OK',
                result: result,
            });
        }      
    }); 
});


module.exports = lists;