 export const uploadFile = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const imageUrl = `/uploads/${req.file.filename}`;

    // Save image to logged-in user
    await User.findByIdAndUpdate(req.user.id, {
      profileImage: imageUrl,
    });

    res.status(200).json({
      message: "Profile image uploaded",
      imageUrl,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error uploading file",
      error: error.message,
    });
  }
};
