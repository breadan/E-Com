
import { check } from "express-validator";
import { validatorMiddleware } from "../../src/middleware/validator.middlware.js";

const getCategoryValidator = [
    check('id').isMongoId().withMessage('Invalid Category Id'),
    validatorMiddleware,
];




export {getCategoryValidator}