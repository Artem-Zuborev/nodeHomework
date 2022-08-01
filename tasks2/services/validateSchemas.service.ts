import * as Joi from "joi";

class SchemaValidate {
    errorResponse(schemaErrors) {
        const errors = schemaErrors.map((error) => {
            let { path, message} = error;
            return {path, message};
        })
        return {
            status: 'failed',
            errors
        }
    }

    validateSchema(schema) {
        return (req, res, next) => {
            const { error} = schema.validate(req.body, {
                abortEarly: false,
                allowUnknown: false,
            })
            if(error) {
                res.status(400).json(this.errorResponse(error.details))
            } else {
                next()
            }
        }
    }
}

export default new SchemaValidate;
