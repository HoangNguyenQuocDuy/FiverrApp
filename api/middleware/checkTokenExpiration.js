import axios from "axios";
const jwt = require("jsonwebtoken");

const getExpirationTime = (token) => {
  const decodedToken = jwt.decode(token);
  const expirationTime = new Date(decodedToken.exp).getTime();

  return expirationTime * 1000;
};

export default async function checkTokenExpiration(req, res, next) {
  const { accessToken, refreshToken } = req.cookies;

  if (!accessToken || !refreshToken) {
    return next();
  }

  const tokenExpiration = getExpirationTime(accessToken);

  if (tokenExpiration < Date.now()) {
    try {
      await axios
        .post("http://localhost:3030/api/auth/refresh-token", { refreshToken })
        .then((response) => {
          res.cookie("accessToken", response.data);
        });
    } catch (error) {
      return next("error", error);
    }
  }

  next();
}
