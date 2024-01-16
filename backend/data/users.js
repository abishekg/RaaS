import bcrypt from "bcryptjs";

const users = [
  {
    name: "Admin User",
    email: "admin@example.com",
    phoneNumber: 123456789,
    password: bcrypt.hashSync("123456", 10),
    isAdmin: true,
  },
  {
    name: "John Doe",
    email: "john@example.com",
    phoneNumber: 123456789,
    password: bcrypt.hashSync("123456", 10),
    isRenter: true
  },
  {
    name: "Jane Doe",
    email: "jane@example.com",
    phoneNumber: 123456789,
    password: bcrypt.hashSync("123456", 10),
  },
];

export default users;
