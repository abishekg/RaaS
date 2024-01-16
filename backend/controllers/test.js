import asyncHandler from "express-async-handler";
import Order from "../models/orderModel.js";
import dotenv from "dotenv";
import colors from "colors";
import mongoose from "mongoose";
import moment from "moment";

dotenv.config();

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(
      "mongodb+srv://varunb27:Boulder@proshop.w2g32.mongodb.net/ProShop",
      {
        useUnifiedTopology: true,
        useNewUrlParser: true,
        useCreateIndex: true,
      }
    );

    console.log(`MongoDB Connected: ${conn.connection.host}`.cyan.underline);
  } catch (error) {
    console.error(`Error: ${error.message}`.red.underline.bold);
    process.exit(1);
  }
};

connectDB();

let newOrder = {
  vehicle: mongoose.Types.ObjectId("638acf22be44931164c4f5f3"),
  startDate: "2022-12-03",
  endDate: "2022-12-04",
};

const validateBookings = (oldBookings, newBooking) => {
  let isValid = true;
  isValid = oldBookings.every((booking) => {
    return (
      (moment(booking.startDate).add(1, "days").format("YYYY-MM-DD") <
        moment(newBooking.startDate).format("YYYY-MM-DD") &&
        moment(booking.endDate).add(1, "days").format("YYYY-MM-DD") <
          moment(newBooking.startDate).format("YYYY-MM-DD")) ||
      (moment(newBooking.endDate).format("YYYY-MM-DD") <
        moment(booking.endDate).add(1, "days").format("YYYY-MM-DD") &&
        moment(newBooking.endDate).format("YYYY-MM-DD") <
          moment(booking.startDate).add(1, "days").format("YYYY-MM-DD"))
    );
  });
  return isValid;
};

// console.log(validateBookings(oldOrder, newOrder));

const testing = async () => {
  const orders = await Order.find({ vehicle: newOrder.vehicle });
  return validateBookings(orders, newOrder);
};

// console.log(newOrder);

testing()
  .then((res) => {
    console.log(res);
  })
  .catch((e) => {
    console.log(e);
  });
