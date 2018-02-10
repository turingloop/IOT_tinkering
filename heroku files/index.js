//url = https://mysterious-badlands-87192.herokuapp.com
const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000
var url = require('url')
var app = express()


app.use(express.static(path.join(__dirname, 'public')))
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

//variables
var tempar = []
var min = 0.0
var max = 0.0
var aver = 0.0
// GET method
app.get('/', function (req, res) {
let data = url.parse(req.url,true).query
console.log(data)
if(data.temperature){
tempar.push(parseInt(data.temperature));
}
res.send('This is the home page Ben!')
})

app.get('/stats',function(req,res) {
//max number
Array.prototype.max = function() {
  return Math.max.apply(null, this);
};
//min number
Array.prototype.min = function() {
  return Math.min.apply(null, this);
};

min = tempar.max()
max = tempar.min()

var sum = 0;
for( var i = 0; i < tempar.length; i++ ){
    sum += parseFloat( tempar[i], 10 );
}

avg = sum/tempar.length;
//webpage
res.setHeader('Content-Type', 'text/html')
res.write('<!doctype html>')
res.write('<head><title>stats</title></head>')
res.write('<body>')
res.write('<p> minimum Temperature -- ' + min + '</p>')
res.write('<p> maximum Temperature -- ' + max + '</p>')
res.write('<p> average Temperature -- ' + aver + '</p>')
res.end('</body></html>')
})

app.get('/reset',function(req,res) {
//webpage
  res.setHeader('Content-Type', 'text/html')
  res.write('<!doctype html>')
  res.write('<head><title>reset</title></head>')
  res.write('<body>')
  res.write('<p> minimum Temperature -- ' + min + '</p>')
  res.write('<p> maximum Temperature -- ' + max + '</p>')
  res.write('<p> mean Temperature -- ' + aver + '</p>')
  res.end('</body></html>')
})

// POST method

app.listen(PORT, () =>
console.log('app listening on port '+PORT))