// Models files sets the database schema 

// unique : true helps prevent duplicate usernames or emails
// trim : removes whitespace from the beginning and end of a string operation 

const mongoose = require("mongoose")

const TaskSchema = new mongoose.Schema({
// Each task has a title, a completed status, and a reference to the user who created it (userId)
  title: {
    type: String,
    required: true
  },

  completed: {
    type: Boolean,
    default: false
  },

  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  }

})

module.exports = mongoose.model("Task", TaskSchema)