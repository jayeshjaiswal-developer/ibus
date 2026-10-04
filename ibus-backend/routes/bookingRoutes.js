const express = require("express");
const Booking = require("../models/Booking");

const router = express.Router();

// Generate PNR
const generatePNR = () => {
  return "IB" + Math.floor(100000 + Math.random() * 900000);
};


// =====================================================
// GET BOOKED SEATS FOR A BUS ON A PARTICULAR DATE
// =====================================================

router.get(
  "/booked-seats/:busNumber/:travelDate",
  async (req, res) => {
    try {
      const {
        busNumber,
        travelDate,
      } = req.params;

      const bookings = await Booking.find({
        "bus.busNumber": busNumber,
        travelDate: travelDate,
        status: "Confirmed",
      });

      const bookedSeats = bookings.flatMap(
        (booking) => booking.selectedSeats
      );

      res.status(200).json({
        bookedSeats,
      });

    } catch (error) {
      console.error(error);

      res.status(500).json({
        message: "Unable to fetch booked seats",
      });
    }
  }
);


// =====================================================
// CREATE BOOKING
// =====================================================

router.post("/", async (req, res) => {
  try {
    const {
      userId,
      bus,
      travelDate,
      selectedSeats,
      passengers,
      totalAmount,
    } = req.body;

    if (
      !userId ||
      !bus ||
      !travelDate ||
      !selectedSeats ||
      !passengers ||
      totalAmount === undefined
    ) {
      return res.status(400).json({
        message: "Incomplete booking information",
      });
    }

    // Check whether selected seats are already booked
    const existingBooking = await Booking.findOne({
      "bus.busNumber": bus.busNumber,
      travelDate,
      status: "Confirmed",
      selectedSeats: {
        $in: selectedSeats,
      },
    });

    if (existingBooking) {
      return res.status(409).json({
        message:
          "One or more selected seats are already booked",
      });
    }

    let pnr;

    // Make sure PNR is unique
    do {
      pnr = generatePNR();
    } while (await Booking.findOne({ pnr }));

    const booking = await Booking.create({
      userId,
      pnr,
      bus,
      travelDate,
      selectedSeats,
      passengers,
      totalAmount,
      paymentStatus: "Paid",
      status: "Confirmed",
    });

    res.status(201).json({
      message: "Booking created successfully",
      booking,
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Server error",
    });
  }
});


// =====================================================
// GET USER BOOKINGS
// =====================================================

router.get(
  "/my-bookings/:userId",
  async (req, res) => {
    try {
      const bookings = await Booking.find({
        userId: req.params.userId,
      }).sort({
        createdAt: -1,
      });

      res.status(200).json(bookings);

    } catch (error) {
      console.error(error);

      res.status(500).json({
        message: "Server error",
      });
    }
  }
);


// =====================================================
// CANCEL BOOKING
// =====================================================

router.put(
  "/:id/cancel",
  async (req, res) => {
    try {
      const booking = await Booking.findById(
        req.params.id
      );

      if (!booking) {
        return res.status(404).json({
          message: "Booking not found",
        });
      }

      if (booking.status === "Cancelled") {
        return res.status(400).json({
          message: "Booking is already cancelled",
        });
      }

      booking.status = "Cancelled";

      await booking.save();

      res.status(200).json({
        message: "Booking cancelled successfully",
        booking,
      });

    } catch (error) {
      console.error(error);

      res.status(500).json({
        message: "Server error",
      });
    }
  }
);


module.exports = router;