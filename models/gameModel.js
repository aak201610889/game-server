const mongoose=require('mongoose')
const gameSchema=new mongoose.Schema({
    nameEn:{type:String,required:true},
    type:{type:String,default:"all"},
    nameAr:{type:String,required:true},
    shortdescAr:{type:String,required:true},
    shortdescEn:{type:String,required:true},
    mainpage:{type:Boolean,default:false},
    backgroundImage:{type:String,required:true},
    images:{type:[String],required:true},
    cpu:{type:String,required:true},
    ram:{type:String,required:true},
    gpu:{type:String,required:true},
    rate:{type:Number,required:true},
    youtube:{type:String,required:true},
    date:{type:Date,default:Date.now}
})
module.exports=mongoose.model('Game',gameSchema)