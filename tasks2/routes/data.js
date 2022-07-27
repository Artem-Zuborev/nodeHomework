const express = require('express');
const router = express.Router();
const Schema = require('../services/validateSchema');
const schema = Schema.Schema;
const validateSchema = Schema.validateSchema(schema);
const crudOperations = require ('../services/crudOperations');
const getAllUsers =  crudOperations.getAll;
const getByIdUser = crudOperations.getById;
const postUser = crudOperations.postUser;
const deleteUser = crudOperations.deleteUser;
const putUser = crudOperations.putUser;

router.get('/',  getAllUsers);
router.get('/:id', getByIdUser);
router.post('/', validateSchema, postUser);
router.put('/:id', validateSchema, putUser);
router.delete('/:id', deleteUser);

module.exports =  router;
