const Joi = require("joi");


const Schema = Joi.object().keys({
    id: Joi.string(),
    login: Joi.string().required(),
    password: Joi.string().alphanum().required(),
    age: Joi.number().min(4).max(130).required(),
    isdeleted: Joi.boolean().required()
})

function errorResponse(schemaErrors) {
    const errors = schemaErrors.map((error) => {
        let { path, message} = error;
        return {path, message};
    })
    return {
        status: 'failed',
        errors
    }
}

function validateSchema(schema) {
    return (req, res, next) => {
        const { error} = schema.validate(req.body, {
            abortEarly: false,
            allowUnknown: false,
        })
        if(error) {
            res.status(400).json(errorResponse(error.details))
        } else {
            next()
        }
    }
}

module.exports = {
    Schema: Schema,
    validateSchema: validateSchema
}
