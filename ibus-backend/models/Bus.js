const mongoose = require("mongoose");

const busSchema = new mongoose.Schema(
  {
    operatorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    operator: {
      type: String,
      required: true,
    },

    busNumber: {
      type: String,
      required: true,
      unique: true,
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

    totalSeats: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

const Bus = mongoose.model("Bus", busSchema);

module.exports = Bus;