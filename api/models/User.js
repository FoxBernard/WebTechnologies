const mongoose = require("mongoose")

const UserSchema = new mongoose.Schema({
// Each user has a username, email, and password. In a real application, you would want to hash the password before saving it to the database for security reasons, but for simplicity, we're storing it as plain text here 
  username: {
    type: String,
    required: true
  },

  email: {
    type: String,
    required: true
  },

  password: {
    type: String,
    required: true
  },
  
  role: {
    type: String,
    enum: ["admin", "user"],
    default: "user"
  }
})

module.exports = mongoose.model("User", UserSchema)