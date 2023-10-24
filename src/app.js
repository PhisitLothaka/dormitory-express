require("dotenv").config();
const express = require("express");
const errorMiddleware = require("./middlewares/error");
const cors = require("cors");
const morgan = require("morgan");
const authRoute = require("./routes/auth-route");
const roomRoute = require("./routes/room-route");
const meterRoute = require("./routes/meter-route");
const summarizeRoute = require("./routes/summarize");

const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

app.use("/auth", authRoute);
app.use("/room", roomRoute);
app.use("/meter", meterRoute);
app.use("/summarize", summarizeRoute);

app.use(errorMiddleware);

const PORT = process.env.PORT || 8888;
app.listen(PORT, () => {
  console.log("Server on port :", PORT);
});
