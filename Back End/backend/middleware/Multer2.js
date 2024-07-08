import multer from 'multer';
import crypto from 'crypto';

const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
  // Valid file types
  const validFileTypes = [
    "application/pdf", // PDF
    "application/msword", // DOC
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document", // DOCX
    "application/vnd.ms-excel", // XLS
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", // XLSX
    "application/vnd.ms-powerpoint", // PPT
    "application/vnd.openxmlformats-officedocument.presentationml.presentation" // PPTX
  ];

  // Validate file type
  if (!validFileTypes.includes(file.mimetype)) {
    cb(new Error('Only document files are allowed!'), false);
  } else {
    cb(null, true);
  }
};


const limits = {
  fileSize: 20 * 1024 * 1024, 
};

const validatePDF = multer({ storage, fileFilter, limits });

export default validatePDF;
