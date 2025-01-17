const express = require('express');
const router = express.Router();

const NewsController = require('../controllers/news/NewsController');
const AuthController = require('../controllers/auth/AuthController');
const AuthorController = require('../controllers/author/AuthorController');
const CategoryController = require('../controllers/category/CategoryController');
const AuthMiddleware = require('../middleware/auth');

router.use(['/categories', '/authors', '/news'], AuthMiddleware.protect);

router.get('/news', NewsController.index);
router.post('/news', NewsController.store);
router.put('/news/:id', NewsController.update);
router.delete('/news/:id', NewsController.destroy);
router.get('/news/:id', NewsController.show);
router.get('/news/search/:title', NewsController.searchNewsByTitle);
router.get('/news/category/sport', NewsController.getSportNews);
router.get('/news/category/finance', NewsController.getFinanceNews);
router.get('/news/category/automotive', NewsController.getAutomotiveNews);

router.post('/auth/register', AuthController.register);
router.post('/auth/login', AuthController.login);
router.post('/auth/logout', AuthController.logout);

// Endpoints for Authors
router.get('/authors', AuthorController.index);
router.get('/authors/:id', AuthorController.show);
router.post('/authors', AuthorController.store);
router.put('/authors/:id', AuthorController.update);
router.delete('/authors/:id', AuthorController.destroy);

router.get('/categories', CategoryController.index);
router.get('/categories/:id', CategoryController.show);
router.post('/categories', CategoryController.store);
router.put('/categories/:id', CategoryController.update);
router.delete('/categories/:id', CategoryController.destroy);



module.exports = router;