import jwt from "jsonwebtoken";
import { createError } from "./error.js";

export const verifyToken = (req, res, next) => {
  const token = req.cookies.access_token;
  !token && next(createError(401, "You are not authenticated!"));
  jwt.verify(token, process.env.JWT, (err, user) => {
    err && next(createError(403, "Token is not valid!"));
    req.user = user;
    next();
  });
};

export const verifyUser = (req, res, next) => {
  verifyToken(req, res, next, () => {
    req.user.id === req.params.id || req.user.isAdmin
      ? next()
      : next(createError(403, "You are not authorized!"));
  });
};

export const verifyAdmin = (req, res, next) => {
  verifyToken(req, res, next, () => {
    if (req.user.isAdmin) {
      next();
    } else {
      next(createError(403, "You are not authorized!"));
    }
    // req.user.isAdmin
    //   ? next()
    //   : next(createError(403, "You are not authorized!"));
  });
};
