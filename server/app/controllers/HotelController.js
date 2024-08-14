import Hotel from "../models/Hotel.js";
import Room from "../models/Room.js";

class HotelController {
  // [GET] /hotels/:id
  hotel(req, res, next) {
    Hotel.findById(req.params.id)
      .then((hotel) => res.status(200).json({ success: true, hotel }))
      .catch((err) => next(err));
  }

  // [GET] /hotels
  allHotels(req, res, next) {
    const { min, max, limit, ...other } = req.query;
    Hotel.find({
      ...other,
      cheapestPrice: { $gt: min | 1, $lt: max || 999 },
    })
      .limit(limit)
      .then((data) => res.status(200).json({ success: true, data }))
      .catch((err) => next(err));
  }

  // [GET] /hotels/search
  async searchHotel(req, res, next) {
    try {
      const searchTerm = req.query.searchTerm || "";
      const limitParser = parseInt(req.query.limit) || 10;
      const minParse = parseInt(req.query.min) || 1;
      const maxParser = parseInt(req.query.max) || 999;

      const results = await Hotel.find({
        city: { $regex: searchTerm, $options: "i" },
        cheapestPrice: { $gt: minParse, $lt: maxParser },
      }).limit(limitParser);
      return res.status(200).json({ success: true, data: results });
    } catch (error) {
      next(error);
    }
  }

  // [GET] /hotels/trash
  trashHotels(req, res, next) {
    Hotel.findDeleted()
      .then((hotels) => res.status(200).json({ success: true, hotels }))
      .catch((err) => next(err));
  }

  // [GET] /countByCity

  async countByCity(req, res, next) {
    const cities = req.query.cities.split(",");

    try {
      const listHotel = await Promise.all(
        cities.map((city) => Hotel.countDocuments({ city: city }))
      );
      res.status(200).json({ success: true, listHotel });
    } catch (error) {
      next(error);
    }
  }

  // [GET] /countByCity
  async countByType(req, res, next) {
    try {
      const hotelCount = await Hotel.countDocuments({ type: "hotel" });
      const apartmentsCount = await Hotel.countDocuments({ type: "apartment" });
      const resortCount = await Hotel.countDocuments({ type: "resort" });
      const villaCount = await Hotel.countDocuments({ type: "villa" });
      const cabinCount = await Hotel.countDocuments({ type: "cabin" });

      res.status(200).json({
        success: true,
        data: [
          {
            type: "hotels",
            count: hotelCount,
          },
          {
            type: "apartments",
            count: apartmentsCount,
          },
          {
            type: "resorts",
            count: resortCount,
          },
          {
            type: "villas",
            count: villaCount,
          },
          {
            type: "cabins",
            count: cabinCount,
          },
        ],
      });
    } catch (error) {
      next(error);
    }
  }

  // [GET] /rooms/:id
  async hotelRooms(req, res, next) {
    try {
      const hotel = await Hotel.findById(req.params.id);
      const listRooms = await Promise.all(
        hotel.rooms.map((room) => {
          return Room.findById(room);
        })
      );
      res.status(200).json({ success: true, listRooms });
    } catch (error) {
      next(error);
    }
  }

  // [POST] /hotels
  create(req, res, next) {
    const newHotel = new Hotel(req.body);
    newHotel
      .save()
      .then((newHotel) => res.status(201).json({ success: true, newHotel }))
      .catch((err) => next(err));
  }

  // [PUT] /hotels/:id
  update(req, res, next) {
    Hotel.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    )
      .then((updateHotel) =>
        res.status(200).json({ success: true, updateHotel })
      )
      .catch((err) => next(err));
  }

  // [PATCH] /hotels/:id/restore
  restore(req, res, next) {
    Hotel.restore({ _id: req.params.id })
      .then(() =>
        res
          .status(200)
          .json({ success: true, message: "Hotel successfully restored" })
      )
      .catch((err) => next(err));
  }

  // [DELETE] /hotels/:id
  destroy(req, res, next) {
    Hotel.deleteById(req.params.id)
      .then(() =>
        res
          .status(200)
          .json({ success: true, message: "Hotel has been deleted" })
      )
      .catch((err) => next(err));
  }

  // [DELETE] /hotels/:id/force
  forceDestroy(req, res, next) {
    Hotel.findByIdAndDelete({ _id: req.params.id })
      .then(() =>
        res.status(200).json({
          success: true,
          message: "The hotel has been deleted from the database.",
        })
      )
      .catch((err) => next(err));
  }
}

export default new HotelController();
