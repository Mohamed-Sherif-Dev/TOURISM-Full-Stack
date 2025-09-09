
const { v2: cloudinary } = require('cloudinary');
require('dotenv').config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadImageClodinary  = async (file) => {
  if (!file || !file.buffer) throw new Error('No file buffer from multer');

  console.log('File received:', {
    originalname: file.originalname,
    mimetype: file.mimetype,
    size: file.size
  });

  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder: 'tourism_app', resource_type: 'image' },
      (err, result) => {
        if (err) {
          console.error('Cloudinary error ->', {
            http_code: err.http_code,
            name: err.name,
            message: err.message
          });
          return reject(err);
        }
        console.log('Cloudinary result secure_url:', result?.secure_url);
        resolve(result);
      }
    );
    stream.end(file.buffer);
  });
};

module.exports =  uploadImageClodinary;
