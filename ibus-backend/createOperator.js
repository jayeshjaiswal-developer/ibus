const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
require("dotenv").config();

const User = require("./models/User");

const createOperator = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    console.log("MongoDB connected");

    const existingOperator = await User.findOne({
      email: "vrl@gmail.com",
    });

    if (existingOperator) {
      console.log("Operator already exists");
      process.exit();
    }

    const hashedPassword = await bcrypt.hash(
      "operator123",
      10
    );

    const operator = await User.create({
      name: "VRL Travels",
      email: "vrl@gmail.com",
      password: hashedPassword,
      role: "operator",
    });

    console.log("Operator created successfully");
    console.log(operator);

    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

createOperator();