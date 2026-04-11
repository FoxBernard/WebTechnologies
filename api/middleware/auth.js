function authMiddleware(req, res, next) {

    if (!req.session.user) {
        return res.status(401).json({ message: "Not authenticated" });
    }

    // Makes is easier to get user role
    req.user = req.session.user;
    next();
    

}

module.exports = authMiddleware;