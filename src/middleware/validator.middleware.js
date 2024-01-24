//to handel Error OutSide Express
//the Error come Here from validator if it Catch Error


import { validationResult } from "express-validator"

const validatorMiddleware = (req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()})
    };
    next();
}

export {validatorMiddleware}