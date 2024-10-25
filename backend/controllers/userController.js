const User = require("../models/userModel");
const crypto = require("crypto");
const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken"); // Make sure jwt is imported

const addUser = async (req, res) => {
  try {
    console.log("inside addUser");
    
    const { name, email, mobile, place } = req.body;

    // Check for required fields (validation)
    if (!name || !email || !mobile || !place) {
      return res.status(400).json({ message: "All fields are required." });
    }


    // Generate an 8-character random password
    const password = crypto.randomBytes(4).toString("hex").slice(0, 8); // Generates a random 8-character password

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "jesvinjose49@gmail.com",
        // pass: "yyrasmmhnslhbidv",
        pass:process.env.EMAIL_PASSWORD
      },
    });
    const mailOptions = {
      from: "jesvinjose49@gmail.com",
      to: email,
      subject: "Your Password",
      text: `Your password is ${password}`,
    };

    const result = await transporter.sendMail(mailOptions);

    const newUser = new User({
      name,
      email,
      mobile,
      place,
      password,
    });

    // Save the treatment to the database
    await newUser.save();

    res.status(201).json({
      message: "User added successfully",
      user: newUser,
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Failed to add user", error: error.message });
  }
};

const getUsers = async (req, res) => {
    try {
      const users = await User.find(); // Assuming `User` is the Mongoose model for your users collection
  
      if (users.length > 0) {
        return res.status(200).json(users); // Return users if found
      } else {
        return res.status(404).json({ message: "No users found" }); // Handle case where no users are found
      }
    } catch (error) {
      console.error("Error fetching users:", error.message);
      return res.status(500).json({ message: "Failed to fetch users", error: error.message });
    }
  };
  

const deleteUser = async (req, res) => {
  try {
    const id = req.params.id;

    // Find the user by ID and delete
    const deletedUser = await User.findByIdAndDelete(id);

    // If user not found, return an error response
    if (!deletedUser) {
      return res.status(404).json({ message: "User not found." });
    }

    // Respond with a success message
    res.status(200).json({ message: "User deleted successfully." });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Failed to delete User", error: error.message });
  }
};

const updateUser = async (req, res) => {
  try {
    const id = req.params.id;
    const { name, mobile, place } = req.body;

    // Check if required fields are present
    if (!name || !mobile || !place) {
      return res.status(400).json({ message: "All fields are required." });
    }

    // Validate mobile format (example: 10 digits)
    const mobileRegex = /^[0-9]{10}$/;
    if (!mobileRegex.test(mobile)) {
      return res.status(400).json({ message: "Invalid mobile number format." });
    }

    // Find existing user by ID
    const existingUser = await User.findById(id);
    if (!existingUser) {
      return res.status(404).json({ message: "User not found." });
    }

    // Prepare the updated data
    const updatedData = {
      name,
      mobile,
      place,
    };

    // Update the user in the database
    const updatedUser = await User.findByIdAndUpdate(id, updatedData, {
      new: true,
    });

    res.status(200).json({ message: "User updated successfully", user: updatedUser });
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ message: "Internal server error." });
  }
};


const verifyUserLogin = async (req, res) => {
    try {
      const { email, password } = req.body;
  
      // Find the user by email
      const user = await User.findOne({ email: email });
  
      // If no user is found with the provided email
      if (!user) {
        console.log("User is not valid");
        return res.status(401).json({ message: "User is not valid" });
      }
  
      // Check if the password matches
      if (user.password === password) {
        // Generate JWT token
        const token = jwt.sign(
          {
            _id: user._id,
            email: user.email,
          },
          process.env.usertoken_secretKey,
          {
            expiresIn: "1h",
          }
        );
  
        // Return successful response
        return res.status(200).json({
          message: "Valid User",
          token: token,
          email: user.email,
          userId: user._id,
        });
      } else {
        // If the password is incorrect
        console.log("Wrong Password");
        return res.status(401).json({ message: "Wrong password" });
      }
    } catch (error) {
      // Handle any unexpected errors
      console.error("Error during login:", error.message);
      return res.status(500).json({ message: "Internal server error" });
    }
  };

const getUserDetails=async(req,res)=>{
    const id=req.params.id;
    const user=await User.findById(id);
    return res.status(200).json(user)
}

module.exports = {
  addUser,
  getUsers,
  updateUser,
  deleteUser,
  verifyUserLogin,
  getUserDetails
};
