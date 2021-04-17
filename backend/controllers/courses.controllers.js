const mongoose = require('mongoose');
const courses = require('../models/courses');


//http://localhost:8080/api/v1/courses/:name [GET]
module.exports.getCourseController = (req , res , next )=>{

    if(req.params){
        mongoose.find({
            name:req.params.name,
        }).then((course)=>{
            if(!course){
                const error = new Error('Course Not found!');
                error.statusCode=404;
                throw error
            } 
            return mongoose.find({
                parentId:course._id.toString()
            })
        }).then((data)=>{
            if(!data){
                const error = new Error('Content Not found!');
                error.statusCode=404;
                throw error
            }
            
            res.status(200).json({massage:'Successful',content:data});

        }).catch((err)=>{
            if(!err.statusCode){
                err.statusCode=500;
            }
            next(err);
        })
    }
    
}

//http://localhost:8080/api/v1/courses/:name [post]
module.exports.createCourseController = async (req, res, next) => {
    let imageUrl;
    if (req.file.filename) {
        imageUrl = req.file.path;
    }

    let description = req.body.description;
    let name= req.body.name;
    let parentId = req.body.parentId;
    let slug = req.body.slug;

    const newcourse = await new courses({
        name,
        description,
        imageUrl,
        parentId,
        slug
    });
    newPost.save();
    res.status(200).json({ message: 'course created successfully!' });
};