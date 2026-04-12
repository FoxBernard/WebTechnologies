const mongoose = require("mongoose")
// Adding bcryot for password encryption so they are not saved as plain visible text
const bcrypt = require("bcryptjs");

// Sets up the User schema 
const UserSchema = new mongoose.Schema({
// Each user has a userID, firstName, lastName,  email,p assword, role (admin / host / user ), DOB

  // userID is not required as mongoose already creates a _ID for each entry, by doing this redundancy is avoided 

  firstName: {
    type: String,
    required: true,
    trim: true // trim : removes whitespace from the beginning and end of a string operation
  },

  lastName: {
    type: String,
    required: true,
    trim: true // trim : removes whitespace from the beginning and end of a string operation
  },

  email: {
    type: String,
    match: [/^\S+@\S+\.\S+$/, "Please use a valid email"], // Adds email validation 
    unique: true,
    lowercase: true,
    trim: true,
    required: true
  },

  password: {
    type: String,
    required: true
  },

  dateOfBirth: {
    type: Date,
    required: true

  },
  
  role: {
    type: String,
    enum: ["admin", "user", "host"],
    default: "user"
  }
}, 

// Records when user was created
{ timestamps: true });

/*

Middleware

*/

// Hashing password before saving it for safety reasons 

UserSchema.pre('save', async function() {
  //If the password hasn't changed, don't bother rehashing it..
  if(!this.isModified('password')) return;
  this.password = await bcrypt.hash(this.password, 10);
});


// Comparison for Login purpose
UserSchema.methods.comparePassword = async function ( userPassword ) {
  return bcrypt.compare( userPassword, this.password);
};


module.exports = mongoose.model("User", UserSchema);