const { getAll, create, getOne, remove, update, login } = require('../controllers/user.controllers');
const express = require('express');
const verifyJWT = require('../utils/verifyJWT')

const routerUser = express.Router();

routerUser.route('/users')
    .get(verifyJWT, getAll)
    .post(create);

routerUser.route('/users/login')
    .post(login);

routerUser.route('/users/:id')
    .get(verifyJWT, getOne)
    .delete(verifyJWT, remove)
    .put(verifyJWT, update);

module.exports = routerUser;