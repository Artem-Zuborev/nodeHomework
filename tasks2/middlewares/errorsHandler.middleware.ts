import { ErrorRequestHandler, NextFunction, Request, Response } from 'express';

const errorHandler = (
    err: ErrorRequestHandler,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    console.log(new Date(Date.now()).toUTCString(), {
        body: req.body,
        params: req.params,
        query: req.query,
        url: req.url,
        method: req.method,
        err
    });
    next();
};

export default errorHandler;
