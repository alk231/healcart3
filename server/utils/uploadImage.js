const cloudinary = require("./cloudinaryHandler");

async function uploadImageHandler(file, destination) {
	let uploadImage = {};

	console.log("checking")
	console.log("Cloud Name:", process.env.CLOUDINARY_CLOUD_NAME);
  console.log("API Key:", process.env.CLOUDINARY_API_KEY);
	console.log(file)
	if (file) {
		uploadImage = await cloudinary.uploader.upload(file.path, {
			folder: destination,
		});
	}
	console.log(uploadImage)

	return uploadImage;
}

module.exports = { uploadImageHandler };
