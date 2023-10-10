require("dotenv").config();
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const authRoute = require("./routes/auth-route");

const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

app.use("/auth", authRoute);

const PORT = process.env.PORT || 8888;
app.listen(PORT, () => {
  console.log("Server on port :", PORT);
});
