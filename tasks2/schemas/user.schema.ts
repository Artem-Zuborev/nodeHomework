import * as Joi from "joi";

export default function schema () {
    return Joi.object().keys({
        id: Joi.string(),
        login: Joi.string().required(),
        password: Joi.string().alphanum().required(),
        age: Joi.number().min(4).max(130).required(),
        isdeleted: Joi.boolean().required()
    })
}
