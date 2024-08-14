import mongoose from "mongoose";

const { Schema } = mongoose;

const CartSchema = new Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    cartItems: [
      {
        hotelId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Hotel",
          required: true,
        },
        hotelName: {
          type: String,
          required: true,
        },
        rooms: [
          {
            roomId: {
              type: mongoose.Schema.Types.ObjectId,
              ref: "Room",
              required: true,
            },
            roomNumbers: {
              type: [String],
            },
            description: {
              type: String,
            },
            maxPeople: {
              type: Number,
            },
            totalPrice: {
              type: Number,
              required: true,
            },
            startDate: {
              type: String,
            },
            endDate: {
              type: String,
            },
          },
        ],
        payment: {
          type: Boolean,
          default: null,
        },
        paymentMethods: {
          type: String,
          default: null,
        },
        address: {
          type: String,
          required: true,
        },
        city: {
          type: String,
          required: true,
        },
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model("Cart", CartSchema);
