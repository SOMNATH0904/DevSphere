const jwt=require("jsonwebtoken");

const jwtAuthMiddleware = (req, res, next) => {
    const authorization = req.headers.authorization;
  
    if (!authorization || !authorization.startsWith("Bearer ")) {
      console.error("JWT Middleware: No token provided");
      return res.status(401).json({ error: "Unauthorized: No token provided" });
    }
  
    const token = authorization.split(" ")[1];
  
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded;
      next();
    } catch (err) {
      console.error("JWT Verification Error:", err.message);
      return res.status(403).json({ error: "Unauthorized: Invalid token" });
    }
  };
const generateToken=(userData)=>{
    return jwt.sign(userData,process.env.JWT_SECRET);
}

module.exports={jwtAuthMiddleware,generateToken}