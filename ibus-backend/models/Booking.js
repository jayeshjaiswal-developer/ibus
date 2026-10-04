const mongoose = require("mongoose");

const passengerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
      required: true,
    },
    gender: {
      type: String,
      required: true,
    },
    seat: {
      type: String,
      required: true,
    },
  },
  { _id: false }
);

const bookingSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    pnr: {
      type: String,
      required: true,
      unique: true,
    },

    bus: {
      operator: {
        type: String,
        required: true,
      },
      busNumber: {
        type: String,
        required: true,
      },
      type: {
        type: String,
        required: true,
      },
      from: {
        type: String,
        required: true,
      },
      to: {
        type: String,
        required: true,
      },
      departure: {
        type: String,
        required: true,
      },
      arrival: {
        type: String,
        required: true,
      },
      price: {
        type: Number,
        required: true,
      },
    },

    travelDate: {
      type: String,
      required: true,
    },

    selectedSeats: {
      type: [String],
      required: true,
    },

    passengers: {
      type: [passengerSchema],
      required: true,
    },

    totalAmount: {
      type: Number,
      required: true,
    },

    paymentStatus: {
      type: String,
      default: "Paid",
    },

    status: {
      type: String,
      enum: ["Confirmed", "Cancelled"],
      default: "Confirmed",
    },
  },
  {
    timestamps: true,
  }
);

const Booking = mongoose.model("Booking", bookingSchema);

module.exports = Booking;