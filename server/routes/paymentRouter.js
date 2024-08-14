import express from "express";
import dotenv from "dotenv";
import PaymentController from "../app/controllers/PaymentController.js";

dotenv.config();
const router = express.Router();

router.get("/config", (req, res) => {
  return res.status(200).json({
    success: true,
    data: process.env.CLIENT_ID,
  });
});

router.patch("/", PaymentController.paymentMethods);

export default router;
