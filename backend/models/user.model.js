const mongoose=require('mongoose')
const userSchema=new mongoose.Schema({
    name:{type:String,required:true},
    email:{type:String,required:true},
    password:{type:String,required:true},
    // savedRecipes:[{type:mongoose.Schema.Types.ObjectId,ref:'Recipe'}]
},{timestamps:true})
module.exports=mongoose.model('User',userSchema)
