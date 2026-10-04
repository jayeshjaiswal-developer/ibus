const mongoose = require("mongoose");
require("dotenv").config();

const Bus = require("./models/Bus");
const buses = require("./data/buses");

const seedBuses = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    console.log("MongoDB connected");

    await Bus.deleteMany();

    await Bus.insertMany(buses);

    console.log("Bus data inserted successfully");

    await mongoose.connection.close();

    console.log("MongoDB connection closed");
  } catch (error) {
    console.error("Error:", error.message);
  }
};

seedBuses();