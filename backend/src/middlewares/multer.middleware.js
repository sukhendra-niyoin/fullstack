import multer from 'multer';

// middleware for upload filr
const storage = multer.diskStorage({
    //destination where we want to save our file
    destination: function (req, file, cb) {
        cb(null, './public/temp');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});

const upload = multer({
    storage,
});