
//----------------------
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');

cloudinary.config({
    cloud_name: 'dyjxyz2jc',
    api_key: '638458188483596',
    api_secret: 'pjxLRPBCzL1nJU1_NIoQ4rXKlfg'
});

const storage = new CloudinaryStorage({
    cloudinary,
    allowedFormats: ['jpg', 'png'],
    params:{
        folder: "demo1"
    }
});

const uploadCloud = multer({ storage });

module.exports = uploadCloud;
