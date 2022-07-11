//const { Console } = require("console");
const express = require("express");
const cors = require("cors");
const app = express();
const engine = require("ejs-mate");
require("dotenv").config();
const PORT = process.env.PORT || 8080;
const DB_URL = process.env.DB_URL;
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const commentRoutes = require("./routes/commentRoutes");
const connectionParams = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};
app.use(
  cors({
    origin: "*",
  })
);
mongoose
  .connect(DB_URL, connectionParams)
  .then(() => {
    console.log("Connected to the database ");
  })
  .catch((err) => {
    console.error(`Error connecting to the database. n${err}`);
  });

const path = require("path");
//const { getUnpackedSettings } = require("http2");
app.engine("ejs", engine);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname, "/public")));

app.use("/comments", commentRoutes);

app.listen(PORT, () => {
  console.log(`Listening at port ${PORT}`);
  console.log(DB_URL);
});
