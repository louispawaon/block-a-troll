const http = require('http');
const express = require('express'); 
const cors = require('cors');
const app = express();              
const port = 3000;                  

app.get('/', function (req, res) {
    res.send('Hello')
  })

app.listen(port, () => {            
    console.log("Now listening on port: ${port}"); 
});