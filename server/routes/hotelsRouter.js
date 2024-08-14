import express from "express";

import { verifyAdmin, verifyUser } from "../utils/verifyToken.js";
import hotelController from "../app/controllers/HotelController.js";

const router = express.Router();

router.get("/", hotelController.allHotels);
router.get("/search", hotelController.searchHotel);
router.get("/trash", verifyAdmin, hotelController.trashHotels);
router.get("/countByCity", hotelController.countByCity);
router.get("/countByType", hotelController.countByType);
router.get("/rooms/:id", hotelController.hotelRooms);
router.get("/:id", hotelController.hotel);

router.post("/", verifyAdmin, hotelController.create);

router.put("/:id", verifyUser, hotelController.update);
router.patch("/:id/restore", verifyAdmin, hotelController.restore);

router.delete("/:id", verifyAdmin, hotelController.destroy);
router.delete("/:id/force", verifyAdmin, hotelController.forceDestroy);

export default router;
