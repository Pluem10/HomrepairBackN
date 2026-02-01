const multer = require('multer');   
const puth = require('path');

const upload = multer({ 
    storage: multer.memoryStorage(),
    limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
    
    fileFilter: (req, file, cb) => {
        checkFileType(file, cb);
    }
 }).single('file'); 

function checkFileType(file, cb) {
    const filetypes = /jpeg|jpg|png|gif/;
    const extname = filetypes.test(puth.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);
}