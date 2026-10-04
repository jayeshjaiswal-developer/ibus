const express = require("express");
const User = require("../models/User");
const Bus = require("../models/Bus");

const router = express.Router();


// GET OPERATOR PROFILE
router.get("/:operatorId", async (req, res) => {
  try {
    const operator = await User.findById(
      req.params.operatorId
    ).select("-password");

    if (!operator) {
      return res.status(404).json({
        message: "Operator not found",
      });
    }

    if (operator.role !== "operator") {
      return res.status(403).json({
        message: "User is not an operator",
      });
    }

    res.status(200).json(operator);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Server error",
    });
  }
});


// GET OPERATOR'S BUSES
router.get("/:operatorId/buses", async (req, res) => {
  try {
    const buses = await Bus.find({
      operatorId: req.params.operatorId,
    }).sort({ createdAt: -1 });

    res.status(200).json(buses);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Server error",
    });
  }
});


// ADD BUS
router.post("/:operatorId/buses", async (req, res) => {
  try {
    const { operatorId } = req.params;

    const operator = await User.findById(operatorId);

    if (!operator) {
      return res.status(404).json({
        message: "Operator not found",
      });
    }

    if (operator.role !== "operator") {
      return res.status(403).json({
        message: "Only bus operators can add buses",
      });
    }

    const {
      busNumber,
      type,
      from,
      to,
      departure,
      arrival,
      price,
      totalSeats,
    } = req.body;

    if (
      !busNumber ||
      !type ||
      !from ||
      !to ||
      !departure ||
      !arrival ||
      price === undefined ||
      totalSeats === undefined
    ) {
      return res.status(400).json({
        message: "All bus details are required",
      });
    }

    const existingBus = await Bus.findOne({
      busNumber,
    });

    if (existingBus) {
      return res.status(409).json({
        message: "Bus number already exists",
      });
    }

    const bus = await Bus.create({
      operatorId: operator._id,
      operator: operator.name,
      busNumber,
      type,
      from,
      to,
      departure,
      arrival,
      price,
      totalSeats,
    });

    res.status(201).json({
      message: "Bus added successfully",
      bus,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Server error",
    });
  }
});


module.exports = router;