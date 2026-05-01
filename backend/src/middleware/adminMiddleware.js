import jwt from "jsonwebtoken";

export const authenticateAdmin = (req, res, next) => {
  const token = req.cookies.token;

  if (!token) return res.status(401).json({ message: "Unauthorized" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_ADMIN_SECRET);
    req.admin = decoded;
    next();
  } catch {
    res.status(401).json({ message: "Token admin tidak valid" });
  }
};