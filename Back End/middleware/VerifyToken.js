import crypto from "crypto";
import jwt from "jsonwebtoken";
import Users from "../models/UserModel.js";

export const verifyToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  const apiKey = req.headers["x-api-key"];

  console.log(token);
  console.log(apiKey);
  if (!token || !apiKey) {
    return res
      .status(401)
      .json({ status: 401, msg: "Unauthorized: Token and API Key required" });
  }
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) {
      return res
        .status(403)
        .json({ status: 403, msg: "Forbidden: Invalid token" });
    }
    // Verifikasi API key disini, asumsikan function untuk memeriksa API key dari database
    verifyApiKey(apiKey, decoded.email, (err, valid) => {
      if (err || !valid) {
        return res
          .status(403)
          .json({ status: 403, msg: "Forbidden: Invalid API key" });
      }
      req.email = decoded.email;
      next();
    });
  });
};

const verifyApiKey = (apiKey, email, callback) => {
  // Pemeriksaan ke database atau cache
  Users.findOne({ where: { email: email, apiKey: apiKey } })
    .then((user) => {
      if (user) {
        callback(null, true); 
      } else {
        callback(new Error("API key not found or mismatch"), false); 
      }
    })
    .catch((error) => {
      callback(error, false); 
    });
};

export const generateToken = (user, keepLogin) => {
  const payload = {
    userId: user.id,
    email: user.email,
  };

  const expiresIn = keepLogin ? "7d" : "1h";
  const token = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, { expiresIn });
  return token;
};

const generateApiKey = () => {
  return crypto.randomBytes(32).toString("hex");
};
