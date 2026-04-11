// Models files sets the database schema 
const mongoose = require("mongoose")

// Invitations database schema 
const InvitationsSchema = new mongoose.Schema({

// Each Invitation has a invitationID, eventID, userID, status ( Invited / accepted / declined )
 
 // invitationID is not required as mongoose already creates a _ID for each entry, by doing this redundancy is avoided 

  eventID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Event",
    required: true,
  },

  userID: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User", // This is where relantionship between tables is created 
  },

  status: {
    type: String,
    enum: ["invited", "attending", "not_attending", "maybe"],
    default: "invited",
    required: true,
  }

  
})

// Preventing duplicate invitations so that same user doesn't get invited more than once 
InvitationsSchema.index({ userID: 1, eventID: 1}, {unique: true});


module.exports = mongoose.model("Invitation", InvitationsSchema)