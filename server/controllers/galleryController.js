const asyncHandler = require("express-async-handler");
const Gallery = require("../models/GalleryModel");
const { uploadImageHandler } = require("../utils/uploadImage");

exports.viewGalleryImagesController = asyncHandler(async (req, res) => {
	const galleryImage = await Gallery.find();

	if (galleryImage.length)
		return res.status(200).json({
			msg: "gallery_img_found",
			galleryImage,
		});

	res.status(200).json({
		msg: "gallery_img_not_found",
		galleryImage: [],
	});
});

exports.addGalleryImageController = asyncHandler(async (req, res) => {
	const { body, file } = req;

	let uploadImage = {};

	// check if the file exist, if exist then upload it to cloudinary
	if (file) {
		uploadImage = await uploadImageHandler(file, "mediAid/gallery");
	}

	console.log("image")
	// add new gallery image
	const newGalleryImage = await new Gallery({
		...body,
		galleryImage: uploadImage.secure_url,
	}).save();

	if (newGalleryImage)
		return res.status(200).json({
			msg: "gallery_img_added",
			newGalleryImage,
		});

	res.status(500).json({
		msg: "gallery_img_not_added",
		newGalleryImage: null,
	});
});



const GalleryImage = require("../models/GalleryModel");
const cloudinary = require("../utils/cloudinaryHandler"); 
exports.deleteGalleryImageController = asyncHandler(async (req, res) => {
  const imageId = req.params.id;

  // 1. Find image in DB
  const image = await GalleryImage.findById(imageId);
	console.log(image)

  if (!image) {
    return res.status(404).json({ message: "Image not found" });
  }

  // 2. Delete from Cloudinary if it has a cloudinaryId
  if (image.cloudinaryId) {
    await cloudinary.uploader.destroy(image.cloudinaryId);
  }

  // 3. Delete from MongoDB
  await image.deleteOne();

  res.status(200).json({
    message: "Gallery image deleted successfully",
    deletedImage: image,
  });
});
