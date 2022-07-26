const express = require('express');
const router = express.Router();
const Joi = require('joi');

const crypto = require("crypto");

const Schema = Joi.object().keys({
    id: Joi.string(),
    login: Joi.string().required(),
    password: Joi.string().alphanum().required(),
    age: Joi.number().min(4).max(130).required(),
    isDeleted: Joi.boolean().required()
})

let data = [
    { id: crypto.randomUUID(), login: 'CreateAProject',  password: '12as34', age: 21, isDeleted: false },
    { id: crypto.randomUUID(), login: 'TakeACoffee',     password: '2wq137', age: 32, isDeleted: false },
    { id: crypto.randomUUID(), login: 'WriteNewArticle', password: 'tytt3549', age: 16, isDeleted: false },
    { id: crypto.randomUUID(), login: 'WalkTowardHome', password: 'wt4297', age: 29, isDeleted: false },
    { id: crypto.randomUUID(), login: 'HaveSomeDinner', password: 'tkl5345', age: 76, isDeleted: false },
];

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

router.get('/', function (req, res) {
    res.status(200).json(data);
});

router.get('/:id', function (req, res) {
    let found = data.find(function (item) {
        return item.id === req.params.id;
    });

    if (found) {
        res.status(200).json(found);
    } else {
        res.sendStatus(404);
    }
});

router.post('/', validateSchema(Schema), function (req, res) {
    let newItem = {
        id: crypto.randomUUID(),
        login: req.body.login,
        password: req.body.password,
        age: req.body.age,
        isDeleted: req.body.isDeleted
    };

    data.push(newItem);

    res.status(201).json(newItem);
});

router.put('/:id', validateSchema(Schema), function (req, res) {
    let found = data.find(function (item) {
        return item.id === req.params.id;
    });

    if (found) {
        let updated = {
            id: found.id,
            login: req.body.login,
            password: req.body.password,
            age: req.body.age,
            isDeleted: req.body.isDeleted
        };

        let targetIndex = data.indexOf(found);

        data.splice(targetIndex, 1, updated);

        res.sendStatus(204);
    } else {
        res.sendStatus(404);
    }
});

router.delete('/:id', function (req, res) {
     data.find(function (item) {
        if(item.id === req.params.id) {
            item.isDeleted = true;
        }
    });
    res.sendStatus(204);
});

module.exports = router;