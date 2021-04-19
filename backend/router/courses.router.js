const { getCourseController, createCourseController } = require('../controllers/courses.controllers');

const router = require('express').Router();

//! api/v1/courses/get/:name [GET]
router.get('/get/:name', getCourseController)
//! api/v1/courses/:name [post]
router.post('/create', createCourseController)





module.exports= router;
