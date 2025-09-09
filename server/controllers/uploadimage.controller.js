const uploadImageClodinary = require("../utils/uploadImageClodinary");

const uploadImageController = async (req, res) => {
    try {
        const file = req.file;

        console.log('File received in controller:', file);

        const uploadImage = await uploadImageClodinary(file);


        return res.json({
            message: "Image uploaded successfully",
            success: true,
            error: false,
            status: 200,
            data : uploadImage
        });
        
    } catch (error) {
        return res.status(500).json({
            message: error.message || "Error in uploading image",
            success: false,
            error: true,
        });
    }
}


module.exports = uploadImageController;