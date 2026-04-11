// This middleware function will help giving permissions dependind on user role 
function roleMiddleware(allowedRoles) {
  return (req, res, next) => {
  
  if (!req.user) {
    return res.status(401).json({ message: "Not authenticated" });
  }
  
  // Convert to array if single role 
  const roles = Array.isArray(allowedRoles) ? allowedRoles : [allowedRoles];
  // This allows to designate specific tasks for some roles 

  if (!roles.includes(req.user.role)) {
    return res.status(403).json({ message: "Forbidden" });
  }

  next(); 

  };
}

module.exports = roleMiddleware;