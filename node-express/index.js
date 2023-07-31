const express=require('express');
const http = require('http');
const morgan = require('morgan');
const bodyParser=require('body-parser');

const dishRouter=require('./routes/dishRouter')
const promotionRouter=require('./routes/promotionRouter')
const leaderRouter=require('./routes/leaderRouter')

const hostname='localhost';
const port=4000;

const app=express();
app.use(morgan('dev'));
app.use(bodyParser.json());

app.use('/dishes',dishRouter);
app.use('/promotions',promotionRouter);
app.use('/leaders',leaderRouter);

app.use(express.static(__dirname+'/public'));

app.use((req,res,next)=>{
    console.log(req.headers);
    res.statusCode=200;
    res.setHeader('Content-Type','text/html');
     res.end('<html><body><h1>this is an express server</h1></body></html>');
     
});

const server=http.createServer(app);
server.listen(port,hostname,()=>{
    console.log(`server running at http://${hostname}:${port}`)
}) ;