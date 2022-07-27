const db = require('../db/index');
const modelUser = db.user
const crypto = require("crypto");

async function getAll (req, res) {
    let data = await modelUser.findAll();
    return res.status(200).json(data)
}

async function getById (req, res) {
    const data = await modelUser.findByPk(req.params.id);
    if (data) {
        return  res.status(200).json(data);
    } else {
        return  res.sendStatus(404);
    }
}

async function postUser (req, res) {
    let newItem = {
        id: crypto.randomUUID(),
        login: req.body.login,
        password: req.body.password,
        age: req.body.age,
        isdeleted: req.body.isdeleted
    };
    const newData = await modelUser.create(newItem);
    return  res.status(201).json(newData);
}

async function putUser (req, res) {
    let updatedUser = {
        id: req.params.id,
        login: req.body.login,
        password: req.body.password,
        age: req.body.age,
        isDeleted: req.body.isDeleted
    };
    await modelUser.update(updatedUser, { where: { id: req.params.id } })
        .then()
    return res.sendStatus(204);
}

async function deleteUser (req, res) {
    await modelUser.update({ isdeleted: true }, { where: { id: req.params.id } })
        .then()
    return res.sendStatus(204);
}


module.exports = {
    getAll: getAll,
    getById: getById,
    postUser: postUser,
    putUser: putUser,
    deleteUser: deleteUser,
}
