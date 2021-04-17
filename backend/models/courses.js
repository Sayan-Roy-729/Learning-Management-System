const mongoose = require('mongoose');

const schema = mongoose.Schema;

const coursesSchema = schema({
   name:{
       type:String,
       require:true,
   },
   descripton:{
       type:String,
   },
   imageUrl:{
       type:String,
   },
   parentId:{
       type: String,
   },
   slug:{
       type: String,
       unique:true,
   }
}, { timestamp: true });

module.exports = mongoose.model('courses', coursesSchema);