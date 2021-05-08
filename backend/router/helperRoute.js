const fs = require('fs');
const express = require('express');

const router = express.Router();

router.get('/', (req, res, next) => {
    let fileNames;

    fs.readdir('./uploads', (err, files) => {
        console.log(err);
        fileNames = files;
        res.status(200).json({files});
    });

    // res.status(200).json({files: fileNames});
});

module.exports = router;