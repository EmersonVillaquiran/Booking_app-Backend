const { getAll, create, getOne, remove, update } = require('../controllers/city.controllers');
const express = require('express');
const verifyJWT = require('../utils/verifyJWT')

const routerCity = express.Router();

routerCity.route('/cities')
    .get(getAll)
    .post(verifyJWT, create);

routerCity.route('/cities/:id')
    .get(getOne)
    .delete(verifyJWT, remove)
    .put(verifyJWT, update);

module.exports = routerCity;