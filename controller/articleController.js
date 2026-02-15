const Joi = require('joi');
const ArticleModel = require('../model/article.model');


const postArticle = async(req,res,next) => {
    const articleSchema = Joi.object({
        title: Joi.string().min(5).optional(),
        content: Joi.string().min(20).required(),
        author: Joi.string().optional().default('Guest')
    });

    const {error, value} = articleSchema.validate(req.body);
    
    if(error) {
        return res.status(400).json({ error});
    }
    try {
        const {title, content, author} = value;
        const newArticle = new ArticleModel({
            title: req.body.title,
            content: req.content,
            author: req.user._id
        });
        await newArticle.save();

        return res.status(200).json({
            message: 'Article created',
            data: newArticle
        })
    } catch (error) {
        console.error(error);
    }
}

const GetAllArticle = async(req,res,next) => {
    // const {limit = 10, page = 1} = req.query

    // const skip = (page - 1)*limit;

    try {
        console.log(req.user)
        const articles = await ArticleModel.find().populate('author','name _id email'); //.find({})
        //.sort({createdAt: -1})
        //.limit(limit)
        //.skip(skip)
        
        return res.status(200).json({
            message: 'Article fetched successfully',
            data: articles
        })
    } catch (error) {
        console.error(error)
        next(error)
    }
}

const GetArticleById = async(req,res,next) => {
    try {
        const article = await ArticleModel.findById(req.params.id)

        if(!article) {
            return res.staus(404).json({
                message: `Article with id ${req.params.id} does not  exist`
            })
        }
        return res.status(200).json({
            message: 'Article found',
            data: article
        })
    } catch (error) {
        next(error)
    }
}

const updateArticleById = async(req,res,next) => {  
       const articleSchema = Joi.object({
        title: Joi.string().min(5),
        content: Joi.string().min(20),
        author: Joi.string().optional()
    });

    const {error, value} = articleSchema.validate(req.body);
     if(error) {
        return res.status(400).json('please provide article title and content')
     }
    try {
        const updateArticle = await ArticleModel.findByIdAndUpdate(
            req.params.id,
            {...value},            
            {
                new: true,
                runValidator:true,
            }
        );
        if(!updateArticle) {
            return res.status(404).json({
                message: ' article not found',
                data: updateArticle
            })
        };
         return res.status(200).json({
                message: ' article updated successfully',
                data: updateArticle
            });
    } catch (error) {
        next(error)
    }
}

const deleteArticleById = async(req,res,next) => {
    try {
        const article = await ArticleModel.findByIdAndDelete(req.params.id)

        if(!article){
            return res.status(404).json({
                message: 'Article not found'
            })
        }
        return res.status(201).json({
            message: `Article with an ID ${req.params.id} is deleted sucessfully`
        })
    } catch (error) {
        next(error)
    }
}


module.exports = {postArticle, GetAllArticle, GetArticleById, updateArticleById, deleteArticleById,};
