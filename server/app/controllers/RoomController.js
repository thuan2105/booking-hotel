import Hotel from "../models/Hotel.js";
import Room from "../models/Room.js";

class RoomController {
  // [POST] /rooms/:hotelId
  async create(req, res, next) {
    const hotelId = req.params.hotelId;
    const newRoom = new Room(req.body);

    newRoom
      .save()
      .then((savedRoom) =>
        Hotel.findByIdAndUpdate(hotelId, {
          $push: { rooms: savedRoom._id },
        })
      )
      .catch((err) => next(err));

    res.status(201).json({ success: true, newRoom });
  }

  // [GET] /rooms/:id
  getRoom(req, res, next) {
    Room.findById(req.params.id)
      .then((room) => {
        console.log(room);
        if (room === null) {
          res.status(204).json({ success: false, message: "No rooms exist." });
        }
        res.status(200).json({ success: true, room });
      })
      .catch((err) => next(err));
  }

  // [GET] /rooms
  getAllRooms(req, res, next) {
    Room.find({})
      .then((data) => {
        res.status(200).json({ success: true, data });
      })
      .catch((err) => next(err));
  }

  // [GET] /rooms/trash
  trashRooms(req, res, next) {
    Room.findDeleted({}).then((rooms) =>
      res.status(200).json({ success: true, rooms })
    );
  }

  // [PUT] /rooms/:id
  update(req, res, next) {
    Room.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true })
      .then(() =>
        res
          .status(200)
          .json({ success: true, message: "Room status has been updated!" })
      )
      .catch((err) => next(err));
  }

  async updateRoomAvailability(req, res, next) {
    const room = await Room.findOne({ "roomNumbers._id": req.params.id });
    const roomNumber = room.roomNumbers.find(
      (number) => number._id.toString() === req.params.id
    );
    if (!roomNumber) {
      return res
        .status(404)
        .json({ success: false, message: "Room not found" });
    }

    Room.updateOne(
      { "roomNumbers._id": req.params.id },
      {
        $push: {
          "roomNumbers.$.unavailableDates": req.body,
        },
      }
    )
      .then(() => {
        res.status(200).json({
          success: true,
          message: "Room status has been update!",
          roomNumber,
        });
      })
      .catch((err) => next(err));
  }

  // [PATCH] /rooms/:id/restore
  restore(req, res, next) {
    const hotelId = req.params.hotelId;
    const roomId = req.params.id;
    Room.restore({ _id: roomId })
      .then(() =>
        Hotel.findByIdAndUpdate(hotelId, { $push: { rooms: roomId } })
      )

      .catch((err) => next(err));
    res
      .status(200)
      .json({ success: true, message: "Room successfully restore." });
  }

  // [DELETE] /rooms/:id
  destroy(req, res, next) {
    const hotelId = req.params.hotelId;
    const roomId = req.params.id;

    Room.deleteById(roomId)
      .then(() =>
        Hotel.findByIdAndUpdate(hotelId, {
          $pull: { rooms: roomId },
        })
      )
      .then(() =>
        res
          .status(200)
          .json({ success: true, message: "Room has been deleted." })
      )
      .catch((err) => next(err));
  }
  // [DELETE] /rooms/:id/force
  forceDestroy(req, res, next) {
    Room.findByIdAndDelete(req.params.id)
      .then(() =>
        res.status(200).json({
          success: true,
          message: "Room has been deleted from the database.",
        })
      )
      .catch((err) => next(err));
  }
}

export default new RoomController();
