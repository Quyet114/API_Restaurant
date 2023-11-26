const express = require('express');
const cors = require('cors');
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const authRoute = require("./router/auth");
const userRoute = require("./router/user");
const passwordRoute = require("./router/password");
const dishRoute = require("./router/dishes");
const categoryRoute = require("./router/categories");
dotenv.config();
mongoose.set('strictQuery', true);
const mongoURI = process.env.MONGODB_URI;
const app = express();

mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true }
);
//.then(() => console.log("Connected to Mongo Successfully"))
//.catch(error => handleError(error))
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
    console.log('Connected to MongoDB');
});

app.use(cors());
app.use(cookieParser());
app.use(express.json());

//Routes
app.use("/v1/auth/", authRoute);
app.use("/v1/user", userRoute);
app.use("/v1/password", passwordRoute);
app.use("/v1/dishes",dishRoute);
app.use("/v1/categories", categoryRoute);
app.listen(8000, () => {
    console.log("server is running");
})
