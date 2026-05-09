module.exports = (req, res, next) => {
  if (!req.session.user) {
    return res.status(401).json({ message: "Not logged in" });
  }

  req.user = req.session.user;
  next();
};