const mongoose = require('mongoose')
const Schema = mongoose.Schema
const article = new mongoose.Schema({
    title:String,
    content:String,
    contentText:String,
    author:{
        type:Schema.Types.ObjectId,
        ref:'user'
    },
    category:{
        type:Schema.Types.ObjectId,
        ref:'category'
    },
    readNumbers:Number,
    commonNumbers:Number
}, {versionkey: false,timestamps:{createdAt: 'createTime',updatedAt:'updateTime'}})
module.exports = mongoose.model('article', article)