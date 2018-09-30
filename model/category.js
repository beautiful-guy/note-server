const mongoose = require('mongoose')
const category = new mongoose.Schema({
    name:{
        type:String,
        unique:true
    }
}, {versionkey: false})
module.exports = mongoose.model('category', category)