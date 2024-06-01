const { getAll, create, remove } = require('../controllers/image.controllers');
const express = require('express');
const upload = require('../utils/multer');
const verifyJWT = require('../utils/verifyJWT');

const routerImage = express.Router();

routerImage.route('/images')
    .get(verifyJWT, getAll)
    .post(verifyJWT, upload.single('image'), create);

routerImage.route('/images/:id')
    .delete(remove);



module.exports = routerImage;