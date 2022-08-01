// @ts-ignore
import express  from 'express';
import SchemaValidate  from '../services/validateSchemas.service';
import UserController from "../controllers/user.controller";
import schemaUser from '../schemas/user.schema'
const userRouter = express.Router();
const validateSchema = SchemaValidate.validateSchema(schemaUser());
const getAllUsers =  UserController.getAllUsers;
const getByIdUser = UserController.getUserById;
const postUser = UserController.postUser;
const deleteUser = UserController.deleteUser;
const putUser = UserController.putUser;

userRouter
    .get('/',  getAllUsers)
    .get('/:id', getByIdUser)
    .post('/', validateSchema, postUser)
    .put('/:id', validateSchema, putUser)
    .delete('/:id', deleteUser)

export default userRouter;
