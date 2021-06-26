const{Schema, model, Types}=require('mongoose')
const schema = new Schema({
    phone:{type:Number,required:true,unique:true},
    
})
module.exports = model('Phones', schema)