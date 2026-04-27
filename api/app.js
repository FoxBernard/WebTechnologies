// MAIN EXPRESS APPLICATION FILE

const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors");

const mongoose = require("mongoose");
const session = require("express-session");
const MongoStore = require("connect-mongo").default;
require("dotenv").config();

// ROUTES
const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");
const eventsRouter = require("./routes/events");
const invitationsRouter = require("./routes/invitations");
const commentsRouter = require("./routes/comments");
const authRoutes = require("./routes/auth");

// APP SETUP
const app = express();

// DATABASE
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

// CORS FOR VITE FRONTEND
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  })
);

// VIEW ENGINE
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

// MIDDLEWARE
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// SESSION
app.use(
  session({
    secret: process.env.SESSION_SECRET || "temporary-secret-key",
    resave: false,
    saveUninitialized: false,

    store: MongoStore.create({
      mongoUrl: process.env.MONGO_URI,
    }),

    cookie: {
      maxAge: 24 * 60 * 60 * 1000,
      secure: false,
      httpOnly: true,
      sameSite: "lax",
    },
  })
);

// TEST ROUTE
app.post("/test", (req, res) => {
  console.log("TEST HIT");
  res.send("Working");
});

// ROUTES
app.use("/", indexRouter);
app.use("/api/events", eventsRouter);
app.use("/api/invitations", invitationsRouter);
app.use("/api/comments", commentsRouter);
app.use("/api/users", usersRouter);
app.use("/api/auth", authRoutes);

// AUTH MIDDLEWARE TEST ROUTES
const authMiddleware = require("./middleware/auth");
const roleMiddleware = require("./middleware/roles");

app.get("/dashboard", authMiddleware, (req, res) => {
  res.json({ message: "User dashboard", user: req.session.user });
});

app.get("/admin", authMiddleware, roleMiddleware("admin"), (req, res) => {
  res.json({ message: "Admin panel" });
});

// ERROR HANDLING
app.use(function (req, res, next) {
  next(createError(404));
});

app.use(function (err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  res.status(err.status || 500);
  res.json({
    error: err.message,
  });
});

module.exports = app;