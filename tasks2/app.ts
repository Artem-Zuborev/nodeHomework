// @ts-ignore
import express from 'express';
import * as http from 'http';
import router from './routes/main.router';

import startDb  from './db/startDatabase';

const app = express();
app.use(express.json());

app.use('', router);

app.use('/', function(req, res) {
    res.send(`server works on host ${port}`);
});
startDb.then()
const server = http.createServer(app);
const port = 3000;
server.listen(port);

console.debug('Server listening on port ' + port);

