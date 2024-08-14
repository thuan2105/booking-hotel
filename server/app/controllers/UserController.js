import User from "../models/User.js";

class UserController {
  // [GET] /users/:id
  user(req, res, next) {
    User.findById(req.params.id)
      .then((user) => res.status(200).json({ success: true, user }))
      .catch((err) => next(err));
  }

  // [GET] /users
  allUsers(req, res, next) {
    User.find({})
      .then((data) => res.status(200).json({ success: true, data }))
      .catch((err) => next(err));
  }

  // [GET] /users/trash
  trashUsers(req, res, next) {
    User.findDeleted({})
      .then((users) => res.status(200).json({ success: true, users }))
      .catch((err) => next(err));
  }

  // [PUT] /users/:id
  update(req, res, next) {
    User.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true })
      .then((updateUser) => res.status(200).json({ success: true, updateUser }))
      .catch((err) => next(err));
  }

  // [PATCH] /users/:id/restore
  restore(req, res, next) {
    User.restore({ _id: req.params.id })
      .then(() =>
        res
          .status(200)
          .json({ success: true, message: "User has been restored." })
      )
      .catch((err) => next(err));
  }

  // [DELETE] /users/:id
  destroy(req, res, next) {
    User.deleteById(req.params.id)
      .then(() =>
        res
          .status(200)
          .json({ success: true, message: "User has been deleted" })
      )
      .catch((err) => next(err));
  }

  // [DELETE] /users/:id/force

  forceDestroy(req, res, next) {
    User.findByIdAndDelete({ _id: req.params.id })
      .then(() =>
        res.status(200).json({
          success: true,
          message: "User has been deleted from the database.",
        })
      )
      .catch((err) => next(err));
  }
}

export default new UserController();
