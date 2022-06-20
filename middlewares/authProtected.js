import jwt from "jsonwebtoken";

const authProtected = (req, res, next) => {
  try {
    let token = req.headers?.authorization;

    if (!token) throw new Error("Not token");
    token = token.split(" ")[1];
    const { uid } = jwt.verify(token, process.env.JWY_SECRET);
    req.uid = uid;
    next();
  } catch (error) {
    return res.status(401).json({ error: error.message });
  }
};

export { authProtected };
