const mongoose = require('mongoose');

const schema = mongoose.Schema;

const coursesSchema = schema({
   name:{
       type:String,
       require:true,
   },
   description:{
       type:String,
   },
   imageUrl:{
       type:String,
   },
   videoUrl:{
       type: String,
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