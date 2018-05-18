const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const SSE = require('sse');
const path = require('path');
const http = require('http');

app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(bodyParser.json());

app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.set('views', path.join(__dirname, 'views'));

app.get('/', (req, res) => {
  res.render('index');
})

var server = http.createServer(app).listen(3006, () => {
  console.log('App listening on port 3006!');
})

var sse = new SSE(server);

sse.on('connection', function(client) {
    setInterval(function(){
        // console.log(client)
        client.send(JSON.stringify({data:new Date()}));
    },1000)
//   client.send('hi there!');
});

process.on('SIGINT', function() {
  process.exit(0);
})

