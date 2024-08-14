import authRouter from "./authRouter.js";
import usersRouter from "./usersRouter.js";
import hotelsRouter from "./hotelsRouter.js";
import roomsRouter from "./roomsRouter.js";
import cartRouter from "./cartRouter.js";
import paymentRouter from "./paymentRouter.js";

const route = (app) => {
  app.use("/api/auth", authRouter);
  app.use("/api/users", usersRouter);
  app.use("/api/hotels", hotelsRouter);
  app.use("/api/rooms", roomsRouter);
  app.use("/api/cart", cartRouter);
  app.use("/api/payment", paymentRouter);
};

export default route;
