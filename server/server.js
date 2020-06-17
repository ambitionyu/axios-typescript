var express = require('express')
var app = express()
const port = 3000
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('public'))
app.get('/get', function (req, res) {
  res.send('hello world')
})
app.post('/post',function(req,res){
  console.log(req)
  res.json(req.body)
})
app.get('/error/get', function(req, res) {
  if (Math.random() > 0.5) {
    res.json({
      msg: `hello world`
    })
  } else {
    res.status(500)
    res.end()
  }
})

app.get('/error/timeout', function(req, res) {
  setTimeout(() => {
    res.json({
      msg: `hello world`
    })
  }, 3000)
})
app.listen(port, () => console.log(`Example app listening on port ${port}!`))