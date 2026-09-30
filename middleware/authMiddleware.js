const jwt = require('jsonwebtoken');

// 1. The Bouncer: Checks if you are logged in (has a valid token)
exports.protect = (req, res, next) => {
    // Look for the token in the request headers
    const authHeader = req.header('Authorization');
    
    // If there is no header, or it doesn't start with "Bearer ", block them
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: "Access denied. No token provided." });
    }

    // Extract just the token part (removing the word "Bearer ")
    const token = authHeader.split(' ')[1];

    try {
        // Verify the digital signature using your secret password from .env
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        // Attach the decoded user data (userId and role) to the request object
        req.user = decoded; 
        
        // Green light: move on to the actual route
        next(); 
    } catch (error) {
        res.status(401).json({ message: "Invalid token." });
    }
};

// 2. The VIP List: Checks if you have the correct role (Farmer vs. Expert)
exports.authorize = (...roles) => {
    return (req, res, next) => {
        // If the user's role is not in the allowed roles list, block them
        if (!roles.includes(req.user.role)) {
            return res.status(403).json({ 
                message: `Access denied. ${req.user.role}s cannot perform this action.` 
            });
        }
        // Green light
        next();
    };
};