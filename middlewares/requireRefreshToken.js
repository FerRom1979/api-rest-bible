import jwt from "jsonwebtoken";

const requireRefreshToken = async (req, res, next) => {
  try {
    const refreshTokenCookie = await req.headers.cookie.split("=")[1];

    if (!refreshTokenCookie) {
      throw new Error("Not token");
    }
    const { uid } = jwt.verify(refreshTokenCookie, process.env.JWT_REFRESH);
    req.uid = uid;
    next();
  } catch (error) {
    return res.status(401).json({ error: error.message });
  }
};

export { requireRefreshToken };
