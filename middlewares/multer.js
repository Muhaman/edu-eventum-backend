const multer = require('multer')
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
            cb(null, 'public/uploads/images');
        } else {
            cb(null, 'public/uploads/videos');
        }
    },
    filename: function (req, file, cb) {
        cb(null, new Date().getTime() + '-' + file.originalname  )
    }
})

const upload = multer({storage: storage})

const uploadMultipleFiles = (maxFiles)=>{
    return upload.array('media',maxFiles)
}

const uploadSingleFiles = ()=>{
    return upload.single('media')
}

module.exports={
    uploadMultipleFiles:uploadMultipleFiles,
    uploadSingleFiles:uploadSingleFiles
}
