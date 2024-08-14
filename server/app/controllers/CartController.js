import Cart from "../models/Cart.js";

class CartController {
  async addToCart(req, res, next) {
    const { user, cartItems } = req.body;
    try {
      let findUser = await Cart.findOne({ user: user });

      if (!findUser) {
        findUser = new Cart({
          user: user,
          cartItems: [],
        });
      }
      const hotel = findUser.cartItems.filter(
        (item) => item.hotelId.toString() === cartItems.hotelId
      );
      if (hotel.length > 0) {
        hotel.forEach((item) => {
          if (item.paymentMethods === null) {
            item.rooms.push(...cartItems.rooms);
          } else {
            findUser.cartItems.push(cartItems);
          }
        });
      } else {
        findUser.cartItems.push(cartItems);
      }
      const updatedCart = await findUser.save();

      res.status(201).json({ success: true, cart: updatedCart });
    } catch (error) {
      next(error);
    }
  }

  async getAllCarts(req, res, next) {
    try {
      const { payment } = req.query;
      let carts = await Cart.find({
        user: req.params.userId,
      });
      if (payment === "true") {
        carts.map((cart) => {
          carts = cart.cartItems.filter((item) => item.payment !== null);
        });
      } else {
        carts.map((cart) => {
          carts = cart.cartItems.filter((item) => item.paymentMethods === null);
        });
      }
      res.status(200).json({ success: true, carts });
    } catch (error) {
      next(error);
    }
  }

  async deleteRoom(req, res, next) {
    try {
      const { userId, hotelId, roomId } = req.params;

      const findUser = await Cart.findOne({ user: userId });
      if (!findUser)
        return res
          .status(404)
          .json({ success: false, message: "User not exist!" });

      const hotel = findUser.cartItems.find(
        (item) => item.hotelId.toString() === hotelId
      );

      if (!hotel)
        return res
          .status(404)
          .json({ success: false, message: "Hotel not exist!" });

      const roomIndex = hotel.rooms.findIndex(
        (item) => item.roomId.toString() === roomId
      );
      if (roomIndex === -1)
        return res
          .status(404)
          .json({ success: false, message: "Room not exist!" });

      hotel.rooms.splice(roomIndex, 1);

      if (hotel.rooms.length === 0) {
        findUser.cartItems = findUser.cartItems.filter(
          (item) => item.hotelId.toString() !== hotelId
        );
      }

      await findUser.save();
      res
        .status(200)
        .json({ success: true, message: "Room deleted successfully!" });
    } catch (error) {
      next(error);
    }
  }

  async deleteHotel(req, res, next) {
    try {
      const { userId, hotelId } = req.params;
      const findUser = await Cart.findOne({ user: userId });
      if (!findUser)
        return res
          .status(404)
          .json({ success: false, message: "User not exist!" });

      const hotelIndex = findUser.cartItems.findIndex(
        (item) => item.hotelId.toString() === hotelId
      );

      if (hotelIndex === -1)
        return res
          .status(404)
          .json({ success: false, message: "Hotel not exist!" });
      findUser.cartItems.splice(hotelIndex, 1);

      if (findUser.cartItems.length === 0) {
        await Cart.findByIdAndDelete(findUser._id);
      } else {
        await findUser.save();
      }

      res
        .status(200)
        .json({ success: true, message: "Hotel deleted successfully!" });
    } catch (error) {
      next(error);
    }
  }
}

export default new CartController();
