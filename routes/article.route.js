const express = require('express')

const {
    postArticle,
     GetAllArticle,
      GetArticleById, 
      updateArticleById, 
      deleteArticleById,
    }= require('../controller/articleController.js')

const router = express.Router();

router.post('/articles', postArticle)

router.get('/articles', GetAllArticle)

router.get('/articles/:id', GetArticleById)

router.put('/articles/:id',updateArticleById)

router.delete('/articles/:id', deleteArticleById)

module.exports = router;