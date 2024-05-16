import multer from "multer";

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/dokumen');
    },
    filename: function (req, file, cb) {
        const originalname = file.originalname;
        const extension = originalname.split('.').pop(); // Dapatkan ekstensi file
        const timestamp = Date.now(); // Dapatkan timestamp
        const uniqueFilename = `${originalname}-${timestamp}.${extension}`;
        cb(null, uniqueFilename);
    }
});

const fileFilter = function (req, file, cb) {
    // Validasi ekstensi file
    if (!file.originalname.match(/\.(pdf)$/)) {
        return cb(new Error('Hanya file PDF yang diizinkan!'), false);
    }
    cb(null, true);
};

const upload = multer({ 
    storage: storage,
    fileFilter: fileFilter
}).fields([
    {
        name: 'dokumen_splp', maxCount: 1
    },
    {
        name: 'dokumen_splp_nasional', maxCount: 1
    }
]);

export default upload;
    