const mongoose = require('mongoose');
const courses = require('../models/courses');


//! /api/v1/courses/:name [GET]
module.exports.getCourseController = (req , res , next )=>{
    // if we get any params
    if(req.params){
        // finding the course data by using name
        mongoose.find({
            name:req.params.name,
        }).then((course)=>{
            if(!course){
                const error = new Error('Course Not found!');
                error.statusCode=404;
                throw error
            } //finding the course by using course_id
            return mongoose.find({
                parentId:course._id.toString()
            })
        }).then((data)=>{
            if(!data){
                const error = new Error('Content Not found!');
                error.statusCode=404;
                throw error
            }
            // sending data to frontend
            res.status(200).json({massage:'Successful',content:data});

        }).catch((err)=>{
            if(!err.statusCode){
                err.statusCode=500;
            }
            next(err);
        })
    }
    
}

//! /api/v1/courses/:name [post]
module.exports.createCourseController = async (req, res, next) => {
    let imageUrl;
    if (req.file.filename) {
        imageUrl = req.file.path;
    }

    let description = req.body.description;
    let name= req.body.name;
    let parentId = req.body.parentId;
    let slug = req.body.slug;
    let videoUrl= req.body.videoUrl;

    const newcourse = await new courses({
        name,
        description,
        imageUrl,
        videoUrl,
        parentId,
        slug
    });
    newcourse.save();
    res.status(200).json({ message: 'course created successfully!' });
};