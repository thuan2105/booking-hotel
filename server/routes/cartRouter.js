import express from "express";

import cartController from "../app/controllers/CartController.js";

const router = express.Router();

router.get("/:userId", cartController.getAllCarts);
router.post("/:userId", cartController.addToCart);
router.delete("/:userId/:hotelId", cartController.deleteHotel);
router.delete("/:userId/:hotelId/:roomId", cartController.deleteRoom);

export default router;
