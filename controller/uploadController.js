const multer = require('multer');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        // Tạo tên file mới bằng timestamp để tránh trùng lặp
        cb(null, Date.now() + '-' + file.originalname);
    },
});
const upload = multer({ storage: storage });
const uploadController = (req, res, next) => {
    // Sử dụng middleware upload.single('image') để xử lý file ảnh có tên 'image'
    upload.single('image')(req, res, function (err) {
        if (err instanceof multer.MulterError) {
            // Xử lý lỗi từ multer
            return res.status(500).json({ message: err.message });
        } else if (err) {
            // Xử lý lỗi khác
            return res.status(500).json({ message: err.message });
        }

        // Nếu không có lỗi, trả về thông tin về file đã upload
        return res.status(200).json({ message: 'File uploaded successfully', file: req.file });
    });
}
module.exports = uploadController;