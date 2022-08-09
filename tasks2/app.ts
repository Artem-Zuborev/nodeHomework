// @ts-ignore
import express from 'express';
import * as http from 'http';
import router from './routes/main.router';
import cors from 'cors';

import './db/startDatabase';
import logger from "./middlewares/logger.middleware";
import errorHandler from "./middlewares/errorsHandler.middleware";

const app = express();

const corsOptions: cors.CorsOptions = {
    allowedHeaders: [
        'Origin',
        'X-Requested-With',
        'Content-Type',
        'Accept',
        'X-Access-Token'
    ],
    origin: ['http://http://localhost:3000/']
};

app.use(cors(corsOptions));

app.use(express.json());

app.use('', router);

app.use(logger);

app.use(errorHandler);

app.use('/', function(req, res) {
    res.send(`server works on host ${port}`);
});

process
    .on('unhandledRejection', (reason, p) => {
        console.error(reason, 'Unhandled Rejection at Promise', p);
    })
    .on('uncaughtException', err => {
        console.error((new Date).toUTCString() + ' uncaughtException:', err.message)
        console.error(err.stack)
        process.exit(1);
    });

const server = http.createServer(app);
const port = 3000;
server.listen(port);

console.debug('Server listening on port ' + port);

