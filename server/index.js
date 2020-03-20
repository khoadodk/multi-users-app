const express = require("express");
require("./config/db")();
const cors = require("cors");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const app = express();
// ------Web securities------
// extract info using mongodb method
const mongoSanitize = require("express-mongo-sanitize");
//  extra security in headers
const helmet = require("helmet");
// cross site scripting
const xss = require("xss-clean");
// DDoS
const rateLimit = require("express-rate-limit");
// http params polution
const hpp = require("hpp");

const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
const linkRoutes = require("./routes/linkRoutes");

//----------Middlewares-------- ORDER is important
app.use(morgan("dev"));
app.use(bodyParser.json({ limit: "5mb", type: "application/json" }));
app.use(cors());
app.use(mongoSanitize());
app.use(helmet());
app.use(xss());
const limiter = rateLimit({
  windowMs: 10 * 60 * 1000, //10 mins
  max: 100 //limit each IP to 100 requests per windowMs
});
app.use(limiter);
app.use(hpp());

//Routes
app.use("/api", authRoutes);
app.use("/api", userRoutes);
app.use("/api", categoryRoutes);
app.use("/api", linkRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server is starting at port ${PORT}`));
