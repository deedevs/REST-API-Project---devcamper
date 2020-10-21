const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const connectDB = require("./config/db");

//Load env vars
dotenv.config({ path: "./config/config.env" });

//Connect to Database
connectDB();

//Route files
const bootcamps = require("./routes/bootcamps");

//initialize express
const app = express();

// Dev logging middleware
if (process.env.NODE_ENV === "development") {
  // Run only in development mode
  app.use(morgan("dev"));
}

//mount routers

app.use("/api/v1/bootcamps", bootcamps);

const PORT = process.env.PORT || 5000;

const server = app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);

//Hanlde unHandled promise rejection
process.on("unhandledRejection", (err, promise) => {
  console.log(`Error: ${err.message}`);
  //close server and exit process
  server.close(() => process.exit(1));
});
