const express = require('express');
const router = express.Router();

const MediaController = require('../controller_Common/MediaController');
const uploadMedia = require('../middleWare/UploadMediaToCloudinary');
// Media routes
router.post('/uploadMedia', uploadMedia.any(), MediaController.uploadMedia);


module.exports = router;