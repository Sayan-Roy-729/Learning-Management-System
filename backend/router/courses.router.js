const path = require('path');
const multer = require('multer');
const express = require('express');
const shortId = require('shortid');

const courseController = require('../controllers/courses.controllers');

const router = express.Router();

//! Handle the image files
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        const uniqueName = `${Date.now()}-${
            Math.random() * 1e10
        }-${shortId.generate()}-${path.extname(file.originalname)}`;
        cb(null, uniqueName);
    },
});

let imageUpload = multer({
    storage,
    // Limit file size to 5MB
    limits: 5000 * 1000,
    fileFilter: (req, file, cb) => {
        // Allowed file extensions
        const fileTypes = /jpeg|jpg|png|svg/;
        // Check the extension
        const extName = fileTypes.test(
            path.extname(file.originalname).toLocaleLowerCase()
        );
        // Check Mime
        const mimeType = fileTypes.test(file.mimetype);

        if (mimeType && extName) {
            return cb(null, true);
        } else {
            cb('Error: Images only (*.png, *.jpg, *.jpeg)');
        }
    },
}).single('courseImage'); // courseImage is the request body parameter

//! Video Files Handle
const videoUpload = multer({
    storage,
    // Limit file size to 100MB
    limits: 100*1000*1000,
    fileFilter: (req, file, cb) => {
        const fileTypes = /mp4/;
        const extName = fileTypes.test(
            path.extname(file.originalname).toLocaleLowerCase()
        );
        const mimeType = fileTypes.test(file.mimetype);

        if (mimeType && extName) {
            return cb(null, true);
        } else {
            return cb('Error: Inly *.mp4 file is allowed');
        }
    }
}).single('courseContentVideos'); // courseContentVideos is the request body parameter

//! api/v1/courses/get?name=courseName [GET] (Fetch course from the database)
router.get('/get', courseController.getCourseController);

//! api/v1/courses/create [POST] (Create new course)
router.post('/create', imageUpload, courseController.createCourseController);

//! api/v1/courses/upload [POST] (Upload video contents of the courses)
router.post('/upload', videoUpload, courseController.uploadCourseContentController);

module.exports = router;
