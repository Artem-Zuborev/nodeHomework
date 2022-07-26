const http = require('http');
const express = require('express');
let cors = require('cors');

const dataRouter = require('./routes/data');

const app = express();
app.use(express.json());
app.use(cors({origin: 'http://localhost:4200/'}));


app.use('/data', dataRouter);

app.use('/', function(req, res) {
    res.send(`server works on host ${port}`);
});


const server = http.createServer(app);
const port = 3000;
server.listen(port);

console.debug('Server listening on port ' + port);