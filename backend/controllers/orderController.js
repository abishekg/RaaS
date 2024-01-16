import asyncHandler from "express-async-handler";
import Order from "../models/orderModel.js";
import Product from "../models/productModel.js";
import moment from "moment";

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

const addOrderItems = asyncHandler(async (req, res) => {
  const { vehicle, startDate, endDate } = req.body;
  if (await Order.find({ vehicle })) {
    // console.log(validateBookings(await Order.find({ vehicle }), req.body));
    if (validateBookings(await Order.find({ vehicle }), req.body)) {
      const order = await Order.create({
        vehicle,
        user: req.user._id,
        startDate,
        endDate,
        status: true,
      });
      if (order) {
        res.status(201).json({
          _id: order._id,
          vehicle: order.vehicle,
          startDate: order.startDate,
          endDate: order.endDate,
          status: order.status,
          vehicleStatus: product.isBooked,
        });
      } else {
        res.status(400);
        throw new Error("Invalid order data");
      }
    } else {
      res.status(400);
      throw new Error("Dates taken");
    }
  } else {
    const order = await Order.create({
      vehicle,
      user: req.user._id,
      startDate,
      endDate,
      status: true,
    });
    if (order) {
      res.status(201).json({
        _id: order._id,
        vehicle: order.vehicle,
        startDate: order.startDate,
        endDate: order.endDate,
        status: order.status,
        vehicleStatus: product.isBooked,
      });
    } else {
      res.status(400);
      throw new Error("Invalid order data");
    }
  }
});

// @desc    Get order by ID
// @route   GET /api/orders/:id
// @access  Private
const getOrderById = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id).populate(
    "user",
    "name email"
  );

  if (order) {
    res.json(order);
  } else {
    res.status(404);
    throw new Error("Order not found");
  }
});

// @desc    Update order to paid
// @route   GET /api/orders/:id/pay
// @access  Private
const updateOrderToPaid = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (order) {
    order.isPaid = true;
    order.paidAt = Date.now();
    order.paymentResult = {
      id: req.body.id,
      status: req.body.status,
      update_time: req.body.update_time,
      email_address: req.body.payer.email_address,
    };

    const updatedOrder = await order.save();

    res.json(updatedOrder);
  } else {
    res.status(404);
    throw new Error("Order not found");
  }
});

// @desc    Update order to delivered
// @route   GET /api/orders/:id/deliver
// @access  Private/Admin
const updateOrderToDelivered = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (order) {
    order.isDelivered = true;
    order.deliveredAt = Date.now();

    const updatedOrder = await order.save();

    res.json(updatedOrder);
  } else {
    res.status(404);
    throw new Error("Order not found");
  }
});

// @desc    Get logged in user orders
// @route   GET /api/orders/myorders
// @access  Private
const getMyOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({ user: req.user._id });
  res.json(orders);
});

// @desc    Get all orders
// @route   GET /api/orders
// @access  Private/Admin
const getOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({}).populate("user", "id name");
  res.json(orders);
});

export {
  addOrderItems,
  getOrderById,
  updateOrderToPaid,
  updateOrderToDelivered,
  getMyOrders,
  getOrders,
};
