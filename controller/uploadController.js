
const uploadImageToCloudinary = {
    uploadImage: async (req, res, next) => {
        try {
            const imageData = req.file;
            console.log(req.file);
            res.status(200).json(imageData);
        } catch (error) {
            return res.status(500).json({ message: 'Internal Server Error' });
        }
    },
}

module.exports = uploadImageToCloudinary;
