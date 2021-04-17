const { getCourseController, createCourseController } = require('../controllers/courses.controllers');

const router = require('express').Router();

//http://localhost:8080/api/v1/courses/:name [GET]
router.get('/:name', getCourseController)
//http://localhost:8080/api/v1/courses/:name [post]
router.post('/create', createCourseController)





module.exports= router;
