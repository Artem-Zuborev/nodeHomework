import { NextFunction, Request, Response } from 'express';

const logger = (req: Request, res: Response, next: NextFunction) => {
    const startDate = Date.now();
    const loggerData = {
        body: req.body,
        params: req.params,
        query: req.query,
        method: req.method,
        startRequest: new Date(startDate).toISOString()
    };

    res.on('close', () => {
        console.log(
            `${req.method} ${req.url} ${JSON.stringify(loggerData)} ${
                Date.now() - startDate
            }ms`
        );
    });
    next();
};

export default logger;
