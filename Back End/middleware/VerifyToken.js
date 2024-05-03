import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if(token == null) return res.status(401).json({ status: 401, msg: "Unauthorized" });
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
        if(err) return res.status(403).json({ status: 403, msg: "Forbidden" });
        req.email = decoded.email;
        next();
    })
}


export const generateToken = (user) => {
    const payload = {
      userId: user.id,
      email: user.email,
      // You can include any additional data you want in the JWT payload
    };
  
    // Generate JWT token with a secret key and expiration time
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: '1h', // Token expires in 1 hour
    });
  
    return token;
  };