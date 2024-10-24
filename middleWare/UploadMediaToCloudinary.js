const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const { } = require('')
const multer = require('multer');


const cloudName = process.env.CLOUD_NAME;
const apiKey = process.env.API_KEY;
const apiSecret = process.env.API_SECRET;

cloudinary.config(
  {
    cloud_name: cloudName,
    api_key: apiKey,
    api_secret: apiSecret
  }
);

const storage = new CloudinaryStorage({
  cloudinary,
  allowedFormats: ['jpg', 'png', 'jpeg', 'mp4'],
  params: {
    folder: 'media',
    resource_type: 'auto',
    allowedFormats: ['jpg', 'png', 'jpeg', 'mp4'],

  }
});

const uploadMedia = multer({
  storage,
  fileFilter: (req, file, cb) => {
    const filetypes = /jpeg|jpg|png|mp4/;
    const mimetype = filetypes.test(file.mimetype);
    const extname = filetypes.test(file.originalname.toLowerCase());

    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb(new Error('Invalid file type. Only jpg, png, and mp4 files are allowed.'));
    }
  }
});

module.exports = uploadMedia;