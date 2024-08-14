import express from "express";

import { verifyAdmin } from "../utils/verifyToken.js";
import roomController from "../app/controllers/RoomController.js";

const router = express.Router();

router.get("/", roomController.getAllRooms);
router.get("/trash", verifyAdmin, roomController.trashRooms);
router.get("/:id", roomController.getRoom);

router.post("/:hotelId", verifyAdmin, roomController.create);

router.put("/:id", verifyAdmin, roomController.update);
router.put("/availability/:id", roomController.updateRoomAvailability);

router.patch("/:id/:hotelId/restore", verifyAdmin, roomController.restore);

router.delete("/:id/:hotelId", verifyAdmin, roomController.destroy);
router.delete("/:id/force", verifyAdmin, roomController.forceDestroy);

export default router;
