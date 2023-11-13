const express = require('express');
const postsController = require('../controllers/post.controller.js');
const JWToken = require('../middleware/JWToken.js');

const router = express.Router();

router.use(JWToken.verifyToken);
router.get('/create', postsController.create);

module.exports = router;
