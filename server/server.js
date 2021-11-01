const express = require("express");
const dotenv = require("dotenv");
const path = require("path");
const connectToMongoDB = require("../config/mongo-connection");
const app = express();
const retailersRouter = require("./routes/retailers");
const productsRouter = require("./routes/products");
const PORT = process.env.PORT;
const cors = require("cors");
const allowedOrigins = ["http://localhost:3000", "http://localhost:3001"];
dotenv.config();
connectToMongoDB();

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true);
      if (allowedOrigins.indexOf(origin) === -1) {
        var msg =
          "The CORS policy for this site does not " +
          "allow access from the specified Origin.";
        return callback(new Error(msg), false);
      }
      return callback(null, true);
    },
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.get("/", (req, res) => {
  res.send("Hello World from Windows!");
});
app.use("/static", express.static(path.join(__dirname, "../static")));
app.use("/uploads", express.static("uploads"));
app.use("/retailers", retailersRouter);
app.use("/products", productsRouter);
app.listen(PORT, () => {
  console.log("\n");
  console.log(path.join(__dirname, "../static"));
  console.log(`Running on port ${PORT}`);
});
