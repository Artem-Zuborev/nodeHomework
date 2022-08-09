// @ts-ignore
import express  from 'express';
import SchemaValidate  from '../repositories/validateSchemas.repository';
import UserController from "../controllers/user.controller";
import schemaUser from '../schemas/user.schema'
import authenticateToken from "../middlewares/auth.middleware";
const userRouter = express.Router();
const validateSchema = SchemaValidate.validateSchema(schemaUser());
const getAllUsers =  UserController.getAllUsers;
const getByIdUser = UserController.getUserById;
const postUser = UserController.postUser;
const deleteUser = UserController.deleteUser;
const putUser = UserController.putUser;

userRouter
    .get('/', authenticateToken, getAllUsers)
    .get('/:id', authenticateToken, getByIdUser)
    .post('/', authenticateToken, validateSchema, postUser)
    .put('/:id', authenticateToken, validateSchema, putUser)
    .delete('/:id', deleteUser)

export default userRouter;
