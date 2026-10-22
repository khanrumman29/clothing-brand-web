/**
 * @desc    Upload an image file
 * @route   POST /api/upload
 * @access  Public / Admin
 */
export const uploadImage = (req, res) => {
  if (!req.file) {
    return res.status(400).json({
      success: false,
      message: 'No image file uploaded. Please send a file with field name "image".'
    });
  }

  // Generate accessible URL
  const host = req.get('host');
  const protocol = req.protocol;
  const fileUrl = `${protocol}://${host}/uploads/${req.file.filename}`;
  const relativeUrl = `/uploads/${req.file.filename}`;

  res.status(201).json({
    success: true,
    message: 'Image uploaded successfully!',
    file: {
      filename: req.file.filename,
      originalName: req.file.originalname,
      size: req.file.size,
      mimetype: req.file.mimetype,
      url: fileUrl,
      relativeUrl: relativeUrl
    }
  });
};
