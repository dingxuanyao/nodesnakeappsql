const express = require('express');
const app = express();
var mysql = require('mysql');
var moment = require("moment")

var HOST = "dbtest-1.cpkotwvp3rnm.us-east-1.rds.amazonaws.com"

var con = mysql.createConnection({
    host: HOST,
    user: "admin2",
    password: "3BhHQfwjiL"
});
  
con.connect(function(err) {
    if (err) throw err;
    console.log(`Connected to mysql at ${HOST}!`);
  });

app.set('view engine', 'ejs');

app.use(express.static(__dirname + '/public'));



app.get('/', (req, res)=>{
    con.query("SELECT name, score, ts FROM nodeSnakeScores.score ORDER BY score DESC LIMIT 10;", function (err,results,fields) {
        // console.log(results);
        res.render('index',{dbscores: results});
    });
});

app.get('/submitscore/:name/:score', (req, res)=>{
    dateTime = moment(Date.now()).format('YYYY-MM-DD HH:mm:ss');
    // console.log(dateTime);
    queryStr = `INSERT INTO nodeSnakeScores.score (name, score) VALUES ("${req.params.name}", ${req.params.score});`;
    console.log(queryStr);
    con.query(queryStr, function (err,results,fields) {
        // console.log(results);
        if (err){
            throw (err);
        }
        res.send('Score submitted');
    });
});

app.listen(80);