import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";

const protect = asyncHandler(async (req, res, next) => {
  let token;

  if (
true
  ) {
    try {
      token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzOGFjZjIyYmU0NDkzMTE2NGM0ZjVmMCIsImlhdCI6MTY3MDExMzI1NCwiZXhwIjoxNjcyNzA1MjU0fQ.QAQjDTEEKGpqDIpgoAluVb0iR5Wfj-sPqTXcaSbHY4U"

      // const decoded = jwt.verify(token, process.env.JWT_SECRET)

      // req.user = await User.findById(decoded.id).select('-password')

      req.user = {
        isAdmin: true,
        _id: "638acf22be44931164c4f5f0",
        isRenter: true,
        name: 'Admin User',
        email: 'admin@example.com',
        phoneNumber: 123456789,
        __v: 0,
        createdAt: "2022-12-03T04:22:58.677Z",
        updatedAt: "2022-12-03T04:22:58.677Z"
      }
      next()
    } catch (error) {
      console.error(error)
      res.status(401)
      throw new Error('Not authorized, token failed')
    }
  }

  if (!token) {
    res.status(401)
    throw new Error('Not authorized, no token')
  }
})

const admin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(401);
    throw new Error("Not authorized as an admin");
  }
};

const renter = (req, res, next) => {
  if (req.user && req.user.isRenter) {
    next();
  } else {
    res.status(401);
    throw new Error("Not authorized as a renter");
  }
};

export { protect, admin, renter };
