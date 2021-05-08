const fs = require('fs');
const slugify = require('slugify');

const Courses = require('../models/courses');
const PaymentCourses = require('../models/payments');

//! /api/v1/courses/get?name=courseName [GET]
module.exports.getCourseController = (req, res, next) => {
    if (req.query.name) {
        // finding the course data by using name
        Courses.findOne({
            name: req.query.name,
        })
            .then((course) => {
                if (!course) {
                    const error = new Error('Course Not found!');
                    error.statusCode = 404;
                    next(error);
                    return;
                } //finding the course by using course_id
                return Courses.find({
                    parentId: course._id.toString(),
                });
            })
            .then((data) => {
                if (data.length <= 0) {
                    const error = new Error('Content Not found!');
                    error.statusCode = 404;
                    next(error);
                    return;
                }
                // sending response
                res.status(200).json({ massage: 'Successful', content: data });
            })
            .catch((err) => {
                if (!err.statusCode) {
                    err.statusCode = 500;
                }
                next(err);
            });
    } else {
        // If there is no query parameters, then fetch the courses that has no parentId.
        Courses.find({ parentId: null })
            .then((course) => {
                // If no course found, throw error.
                if (course.length <= 0) {
                    const error = new Error('No course found');
                    error.statusCode = 404;
                    next(error);
                    return;
                }

                res.status(200).json({
                    message: 'Successful',
                    courses: course,
                });
            })
            .catch((error) => {
                if (!error.statusCode) {
                    error.statusCode = 500;
                    next(error);
                }
            });
    }
};

//! api/v1/courses/create [POST]
module.exports.createCourseController = (req, res, next) => {
    if (!req.file) {
        // If there is no image file, throw error
        const error = new Error('Course image file is required');
        error.statusCode = 404;
        next(error);
    } else {
        // Fetch necessary details from request body
        const description = req.body.description;
        const name = req.body.name.toLowerCase();
        const imageUrl = req.file.path;
        const slug = slugify(name);

        Courses.findOne({ name })
            .then((course) => {
                // Check the course is already exists, throw error
                if (course) {
                    const error = new Error('Course already created!');
                    error.statusCode = 409;
                    next(error);
                    return;
                }

                // create new course
                const newCourse = new Courses({
                    name,
                    description,
                    imageUrl,
                    slug,
                });

                // save the course into database
                newCourse.save((error, course) => {
                    if (error) {
                        error.statusCode = 400;
                        next(error);
                        return;
                    } else {
                        res.status(200).json({
                            message: 'Successfully created!',
                            course: course,
                        });
                    }
                });
            })
            .catch((error) => {
                if (!error.statusCode) {
                    error.statusCode = 500;
                }

                next(error);
            });
    }
};

//! api/v1/courses/upload [POST]
module.exports.uploadCourseContentController = (req, res, next) => {
    // If there is no video file, throw error
    if (!req.file) {
        const error = new Error('Video files are required');
        error.statusCode = 404;
        next(error);
    } else {
        // Fetch the details from the request body
        const name = req.body.name.toLowerCase();
        const description = req.body.description;
        const parentId = req.body.parentId;
        const slug = slugify(name);

        // Check if same content belongs to the course already exists
        Courses.findOne({ name, parentId }).then((courseContent) => {
            if (courseContent) {
                const error = new Error('This course content already exists');
                error.statusCode = 409;
                next(error);
            }

            // Create new content
            const newCourseContent = new Courses({
                name,
                description,
                parentId,
                slug,
                videoUrl: req.file.path,
            });

            // Save the content into the database
            newCourseContent.save((error, content) => {
                if (error) {
                    error.statusCode = 400;
                    next(error);
                } else {
                    res.status(200).json({ message: 'Successful!', content });
                }
            });
        });
    }
};

// ? Update the course
module.exports.courseUpdate = (req, res, next) => {
    const courseId = req.body.id;

    if (!courseId) {
        res.status(404).json({ message: 'Please specify the course id' });
    } else {
        let imageFile;
        if (req.file) {
            imageFile = req.file.path;
        }
        Courses.findByIdAndUpdate(
            courseId,
            {
                name: req.body.name,
                description: req.body.description,
                imageUrl: imageFile,
            },
            {
                new: true,
            },
            (error, doc) => {
                if (error) {
                    error.statusCode = 500;
                    next(error);
                    return;
                }
                res.status(200).json({ message: 'Successfully updated', doc });
            }
        );
    }
};

// ? Get the enrolled courses
module.exports.enrolledCourses = (req, res, next) => {
    console.log('User Enrolled body: ', req.body);
    PaymentCourses.findOne({ userEmail: req.body.userEmail })
        .then((user) => {
            if (!user) {
                res.status(404).json({ message: 'User is not found!' });
            } else {
                res.status(200).json({ message: 'Successful', user });
            }
        })
        .catch((error) => {
            if (!error.statusCode) {
                error.statusCode = 500;
            }
            res.status(error.statusCode).json({ error });
        });
};

//? Delete file from the uploads directory
module.exports.deleteFile = (req, res, next) => {
    const deleteFileName = req.body.filename;
    const filePath = `./uploads/${deleteFileName}`;

    fs.unlink(filePath, (err) => {
        if (err) {
            res.status(500).json({ message: 'Failed to delete the file' });
        } else {
            res.status(200).json({ message: 'Successfully deleted the file!' });
        }
    });
};

//? Course Content Update
module.exports.courseContentUpdate = (req, res, next) => {
    const contentId = req.body.id;

    if (!contentId) {
        res.status(404).json({ message: 'Course content id is required!' });
    } else {
        let videoFile;
        if (req.file) {
            videoFile = req.file.path;
        }

        Courses.findByIdAndUpdate(
            contentId,
            {
                name: req.body.name,
                description: req.body.description,
                videoUrl: videoFile,
                parentId: req.body.parentId,
            },
            {
                new: true,
            },
            (error, doc) => {
                if (error) {
                    error.statusCode = 500;
                    res.status(500).json({ error });
                } else {
                    res.status(200).json({
                        message: 'successfully updated',
                        doc,
                    });
                }
            }
        );
    }
};
