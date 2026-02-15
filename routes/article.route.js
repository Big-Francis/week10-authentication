const express = require('express')
const requireAuth = require('../middleware/require.js');
const {
    postArticle,
     GetAllArticle,
      GetArticleById, 
      updateArticleById, 
      deleteArticleById,
    }= require('../controller/articleController.js')

const router = express.Router();

router.post('/articles',requireAuth, postArticle)

router.get('/articles',requireAuth, GetAllArticle)

router.get('/articles/:id',requireAuth, GetArticleById)

router.put('/articles/:id',requireAuth,updateArticleById)

router.delete('/articles/:id',requireAuth, deleteArticleById)

module.exports = router;