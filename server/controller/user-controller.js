const userSchema = require("../schema/userSchema");
const multer = require("multer");
const fs = require("fs");
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const imagesPath = "./uploads/userPics/" + req.params.id;

    if (!fs.existsSync(imagesPath)) {
      fs.mkdirSync(imagesPath, { recursive: true });
    }

    cb(null, imagesPath);
  },
  filename: (req, file, cb) => {
    const profilePicFilename = "profilePic.jpg"; // Use a consistent filename
    cb(null, profilePicFilename);
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 1024 * 1024 * 10 }, // Limit file size to 10MB
}).single("profilePic");

exports.updateUser = async (req, res) => {
  try {
    upload(req, res, async (err) => {
      if (err) {
        throw new Error(err.message);
      }

      const { _id, about } = req.body;
      const profilePic = req.file ? "/" + req.file.path : "";

      const user = await userSchema.findOneAndUpdate(
        { _id: _id },
        {
          $set: {
            profilePic: "https://angular-chatapp.onrender.com/" + profilePic,
            about: about,
          },
        },
        { new: true }
      );

      if (!user) {
        return res.status(404).json({
          success: false,
          message: "User not found",
        });
      }

      res.status(200).json({
        success: true,
        user,
        message: "User updated successfully!",
      });
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// Register Admin
exports.createUser = async (req, res) => {
  try {
    const { userName, emailId, password, _id, timestamps } = req.body;

    const user = await userSchema.create({
      userName,
      emailId,
      password,
      _id,
      timestamps,
    });

    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// Login Admin
exports.userLogin = async (req, res) => {
  try {
    const { emailId, password } = req.body;

    const user = await userSchema.findOne({ emailId });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    const isPasswordMatched = await user.comparePassword(password);

    if (!isPasswordMatched) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// Get All users
exports.allUsers = async (req, res) => {
  try {
    const userList = await userSchema.find({ _id: { $ne: req.body.id } });

    if (!userList || userList.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No users found",
      });
    }

    res.status(200).json({
      success: true,
      userList,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

exports.getUserbyID = async (req, res) => {
  try {
    const user = await userSchema.findOne({ _id: req.params.id });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "No users found",
      });
    }

    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// Update user
exports.updateconnectionsUser = async (req, res) => {
  try {
    const { connections, conversations } = req.body;

    const user = await userSchema.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "User Updated Successfully!",
      user,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
