var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var products = require('./dummyDB.json')

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: false }));


function paginateData(start, end = 20) {
  return products.slice(start, start + end);
}

app.get('/getList', function (req, res) {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  console.log('Get list called', req.query);
  let pageNum = parseInt(req.query.pageNum) >= 0 ? parseInt(req.query.pageNum) : 0;
  //simulating API delay
  setTimeout(() => {
    res.send(paginateData(pageNum));
  }, 500)
})

var server = app.listen(3001, function () {
  var port = server.address().port

  console.log("App listening at http://localhost:" + port)

})