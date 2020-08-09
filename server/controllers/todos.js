const express = require('express');
const db = require('./db');

var todos = express.Router();

todos.get('/:list', (req, res)=> {
  db.all(`SELECT * FROM todos WHERE listname = '${req.params.list}'`, (err, result)=> {
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

todos.post('/insert', function(req, res) {
    db.run(`INSERT INTO todos (title, listname, completed) VALUES ('${req.body.title}', '${req.body.list}', FALSE)`, 
    (err, result)=>{
        if(err) {
            res.type('application/json');
            res.send({
                status: 'err',
                result: err,
            });
        }
        else{
            db.get('SELECT id FROM todos WHERE id = (SELECT MAX(id) FROM todos)', (err, result)=>{
                res.type('application/json');
                res.send({
                    status: 'OK',
                    result: result,
                });
            })
        }      
    }); 
});

todos.post('/delete', function(req, res) {
    db.run(`DELETE FROM todos WHERE id = '${req.body.id}'`, 
    (err, result)=> {
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

todos.post('/update', function(req, res) {
    db.run(`UPDATE todos SET completed = ${req.body.completed} WHERE id = '${req.body.id}'`,
    (err, result)=> {
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
                result: req.body.completed,
            });
        }      
    }); 
});

module.exports = todos;