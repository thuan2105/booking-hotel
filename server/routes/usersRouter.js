import express from "express";
import userController from "../app/controllers/UserController.js";
import { verifyAdmin, verifyToken, verifyUser } from "../utils/verifyToken.js";

const router = express.Router();

router.get("/", userController.allUsers);
router.get("/trash", userController.trashUsers);
router.get("/:id", verifyUser, userController.user);

router.put("/:id", verifyUser, userController.update);
router.patch("/:id/restore", verifyUser, userController.restore);

router.delete("/:id", verifyUser, userController.destroy);
router.delete("/:id/force", verifyUser, userController.forceDestroy);

export default router;
