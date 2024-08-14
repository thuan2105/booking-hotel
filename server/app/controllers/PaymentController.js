import Cart from "../models/Cart.js";

class PaymentController {
  async paymentMethods(req, res, next) {
    try {
      const { userId, hotelId, selectedOption, _id } = req.body;
      const findUser = await Cart.findOne({ user: userId });
      if (!findUser)
        return res
          .status(404)
          .json({ success: false, message: "User not exist!" });
      const hotel = findUser.cartItems.find(
        (item) => item._id.toString() === _id
      );

      if (!hotel)
        return res
          .status(404)
          .json({ success: false, message: "Hotel not exist!" });
      hotel.paymentMethods = selectedOption;
      hotel.payment = selectedOption === "paypal";

      findUser.markModified("cartItems");
      await findUser.save();
      res.status(200).json({
        success: true,
        message: "Confirm payment method successfully",
      });
    } catch (error) {
      next(error);
    }
  }
}

export default new PaymentController();
