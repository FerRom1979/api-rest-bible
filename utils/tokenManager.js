import jwt from "jsonwebtoken";

const generateToken = (uid) => {
  const expiresIn = 60 * 15;

  try {
    const token = jwt.sign({ uid }, process.env.JWY_SECRET, { expiresIn });
    return { token, expiresIn };
  } catch (error) {
    console.log(error);
  }
};

const generateRefreshToken = async (uid, res) => {
  const expiresIn = 60 * 60 * 24 * 30;
  try {
    const refreshToken = jwt.sign({ uid }, process.env.JWT_REFRESH, {
      expiresIn,
    });

    res.cookie("refreshToken", refreshToken, [
      {
        httpOnly: true,
        secure: !(process.env.MODE === "develop"),
        expires: new Date(Date.now() + expiresIn * 1000),
      },
    ]);
  } catch (error) {
    console.log(error);
  }
};

export { generateToken, generateRefreshToken };
