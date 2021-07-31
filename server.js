const express = require("express");
const dotenv = require('dotenv');
const connectMongoDB = require("./config/mongo-connection");
const app = express();
const PORT = process.env.PORT;

dotenv.config();
connectToMongoDB();

app.use(express.json({extended: false}))
app.listen(PORT, () => {
    console.log(`Running on port ${PORT}`);
})