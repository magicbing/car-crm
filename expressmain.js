var express = require('express')
var app = express()

app.get('/', function (req, res) {
  res.send('Hello World')
})
app.get('/1', function (req, res) {
  res.send('Hello World1')
})


app.listen(3000)