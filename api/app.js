
// MAIN EXPRESS APPLICATION FILE

// This file sets up:
// Express server
// Middleware
// MongoDB connection
// Sessions (for login state)
// Routes (users and tasks)
// Error handling
  

// REQUIRED MODULES

const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const cors = require('cors');

// MongoDB + Sessions + Environment Variables
const mongoose = require('mongoose');
const session = require('express-session');
require('dotenv').config();


// ROUTES

// Import route files (modular structure)
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const eventsRouter = require('./routes/events');
const invitationsRouter = require('./routes/invitations');
const commentsRouter = require('./routes/comments');


//new 
const authRoutes = require("./routes/auth"); 

// APP SETUP
var app = express();


// DATABASE CONNECTION (MongoDB)

// Connect to MongoDB using Mongoose
// This allows us to store users, tasks, etc.
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.log(err));

// CORS CONFIGURATION

// Allows React frontend (port 3000) to talk to backend
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true // IMPORTANT for sessions/cookies
}));

// View engine setup. (predefined by boilerplate)
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');


// MIDDLEWARE (predefined by boilerplate, I've added the CORS middleware below)

// Logger - shows requests in terminal (GET, POST etc.)
app.use(logger('dev'));
// Parse JSON data from requests
app.use(express.json());
// Parse form data (URL encoded)
app.use(express.urlencoded({ extended: false }));
// Parse cookies from the browser
app.use(cookieParser());
// Serve static files (optional - not heavily used in API projects)
app.use(express.static(path.join(__dirname, 'public')));


// SESSION CONFIGURATION

// Stores login state (user stays logged in)
// Session ID is stored in a cookie in the browser, and session data is stored in MongoDB (instead of memory) for better scalability and persistence.
const MongoStore = require('connect-mongo').default;

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,

  store: new MongoStore({
    mongoUrl: process.env.MONGO_URI
  }),

  cookie: {
    maxAge: 24 * 60 * 60 * 1000, // 1 day
    secure: false,
    httpOnly: true,
  }
}));
 

// ROUTES (API ENDPOINTS)
app.use('/', indexRouter); // Optional - can be used for a simple test route or homepage
app.use('/events', eventsRouter);
app.use('/invitations', invitationsRouter);
app.use('/comments', commentsRouter);

// All user-related routes
app.use('/api/users', usersRouter);


//new
app.use("/api/auth", authRoutes);
 

//new - example of protected route using auth middleware
// Example protected routes
const authMiddleware = require("./middleware/auth");
const roleMiddleware = require("./middleware/roles");

app.get("/dashboard", authMiddleware, (req, res) => {
  res.json({ message: "User dashboard", user: req.session.user });
});

app.get("/admin", authMiddleware, roleMiddleware("admin"), (req, res) => {
  res.json({ message: "Admin panel" });
});

// ERROR HANDLING

// Catch 404 errors (route not found)
app.use(function(req, res, next) {
  next(createError(404));
});

// General error handler
app.use(function(err, req, res, next) {

  // Show detailed errors in development only
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // Send error response
  res.status(err.status || 500);

  // For API projects, JSON is better than rendering views
  res.json({
    error: err.message
  });
});


// Export the app module to be used by the server
module.exports = app;