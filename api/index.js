require("dotenv").config();

var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const cors = require("cors");

var apiRouter = require("../routes/api");

var app = express();

// Set up mongoose connection
const mongoose = require("mongoose");
mongoose.set("strictQuery", false);
const mongoDB = process.env.MONGO_URL;

main().catch((err) => console.log(err));
async function main() {
  await mongoose.connect(mongoDB);
}

app.options("*", cors());

app.use(
  cors({
    origin: [
      "http://localhost:5173/",
      "https://wheres-waldo-client.vercel.app",
      "https://wheres-waldo-client*",
    ],
    credentials: true,
  })
);

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/api", apiRouter);

app.get("/", (req, res, next) => {
  res.send("Server Start");
});

// // Serve static files from the Vite build output
// app.use(express.static(path.join(__dirname, "dist")));

// // Handle requests that don't match any static files
// app.get("*", (req, res) => {
//   res.sendFile(path.join(__dirname, "dist", "index.html"));
// });

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;

/* 

Routes:

- Get scores in order from low to high ms
- Post score with username and time as body
- Get each character's coordinates

*/
