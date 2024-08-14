import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import User from "../models/User.js";
import { createError } from "../../utils/error.js";

class AuthController {
  // [POST] /auth/register
  async register(req, res, next) {
    const { email } = req.body;
    const checkUser = await User.findOne({ email: email });
    if (checkUser) {
      return res
        .status(409)
        .json({ success: false, message: "Email already exists!" });
    }

    const salt = bcrypt.genSaltSync(10);
    const hashPassword = bcrypt.hashSync(req.body.password, salt);
    const newUser = new User({
      ...req.body,
      password: hashPassword,
    });

    newUser
      .save()
      .then(() =>
        res
          .status(201)
          .json({ success: true, message: "Use hash been created." })
      )
      .catch((err) => next(err));
  }

  // [POST] /auth/login
  async login(req, res, next) {
    try {
      const user = await User.findOne({ email: req.body.email });
      !user && next(createError(400, "Wrong password or email!"));
      const isPasswordCorrect = await bcrypt.compare(
        req.body.password,
        user.password
      );
      if (!isPasswordCorrect)
        return next(createError(400, "Wrong password or email!"));
      const token = jwt.sign(
        { id: user._id, isAdmin: user.isAdmin },
        process.env.JWT
      );
      const { _id, isAdmin, firstName, lastName } = user._doc;
      res.cookie("access_token", token, {
        httpOnly: true,
        secure: true,
      });
      res.status(200).json({
        success: true,
        data: {
          loggedIn: true,
          details: { _id, isAdmin, firstName, lastName },
        },
      });
    } catch (error) {
      next(error);
    }
  }
}

export default new AuthController();
