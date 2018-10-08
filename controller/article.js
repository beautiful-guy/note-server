const {Router} = require('express')
const router = Router()
const articleModel = require('../model/article')
const categoryModel = require('../model/category')
router.post('/article',async (req,res,next)=>{
    try{
        if(req.session.user){
            const {content,contentText,title,category} = req.body
            const data = await articleModel.create({
                content,
                contentText,
                title,
                category,
                author:req.session.user._id
            })
            res.json({
                code:200,
                msg:'笔记发布成功!'
            })
        }else {
            res.json({
                code:403,
                msg:'请登录后在写笔记'
            })
        }
    }catch(err){
        next(err)
    }
})
router.get('/article',(req,res,next)=>{
    let {pn=1,size=10} = req.query
    pn = parseInt(pn)
    size = parseInt(size)
    articleModel.find().skip((pn-1)*size).limit(size).sort({_id:-1})
        .populate({
            path:'author',
            select: '-password',
        }).populate({
            path:'category'
        }).then(data=>{
            res.json({
                code:200,
                data
            })
    })
})
router.get('/article/:id',(req,res,next)=>{
    const {id} = req.params
    articleModel.findById(id).
    populate({
        path:'author',
        select: '-password',
    }).populate({
        path:'category'
    }).then(data=>{
        res.json({
            code:200,
            data
        })
    })
})

module.exports = router