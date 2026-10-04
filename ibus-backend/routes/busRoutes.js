const express = require("express");
const Bus = require("../models/Bus");
const Booking = require("../models/Booking");

const router = express.Router();


// =====================================================
// SEARCH BUSES WITH DATE-WISE SEAT AVAILABILITY
// =====================================================

router.get("/search", async (req, res) => {
  try {
    const { from, to, travelDate } = req.query;

    if (!from || !to || !travelDate) {
      return res.status(400).json({
        message:
          "From, To and Travel Date are required",
      });
    }

    // Find buses for the route
    const buses = await Bus.find({
      from: {
        $regex: `^${from}$`,
        $options: "i",
      },

      to: {
        $regex: `^${to}$`,
        $options: "i",
      },
    });

    // Calculate availability for each bus
    const busesWithAvailability = await Promise.all(
      buses.map(async (bus) => {

        const bookings = await Booking.find({
          "bus.busNumber": bus.busNumber,
          travelDate,
          status: "Confirmed",
        });

        // Collect all booked seats
        const bookedSeats = bookings.flatMap(
          (booking) => booking.selectedSeats
        );

        const availableSeats =
          bus.totalSeats - bookedSeats.length;

        return {
          ...bus.toObject(),

          bookedSeats: bookedSeats,

          availableSeats:
            Math.max(availableSeats, 0),
        };
      })
    );

    res.status(200).json(
      busesWithAvailability
    );

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Server error",
    });
  }
});


module.exports = router;