const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
// const User = require("./model/user.model");
const { userRegister, userLogin } = require("./controller/user.router");

dotenv.config();
const PORT = 5000;
const app = express();

app.use(cors());
app.use(express.json());
mongoose.connect(`mongodb://localhost:27017/mean-authentication`);

app.get("/", (req, res) => {
  res.send("<h1>This is HomePage</h1>");
});

app.post("/register", userRegister);

app.post("/login", userLogin);

app.use((req, res) => {
  res.send("<h1>404!,Page is NotFound!</h1>");
});

app.listen(PORT, () => {
  console.log(`Server is Running on port:http://localhost:${PORT}`);
});
