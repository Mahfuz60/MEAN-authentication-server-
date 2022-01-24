const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
dotenv.config();
const userHandler = require("./routes/user.routes");

const PORT = 5000;
const app = express();

app.use(cors());
app.use(express.json());
mongoose.connect("mongodb://localhost:27017/mean-authentication");

app.use("/user", userHandler);

app.get("/", (req, res) => {
  res.send("<h1>This is HomePage</h1>");
});

app.use((req, res) => {
  res.send("<h1>404!,Page is NotFound!</h1>");
});

app.listen(PORT, () => {
  console.log(`Server is Running on port:http://localhost:${PORT}`);
});
