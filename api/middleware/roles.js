function roleMiddleware(requiredRole) {
return (req, res, next) => {
  
if (!req.session.user) {
return res.status(401).json({ message: "Not authenticated" });
}
 
if (req.session.user.role !== requiredRole) {
  return res.status(403).json({ message: "Forbidden" });
}

next(); 

};
}

module.exports = roleMiddleware;