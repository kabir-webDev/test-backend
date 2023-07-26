const express = require("express");
const { errorHandler } = require("./middlewares/errorMiddleware");
const app = express();
const env = require("dotenv").config();
const blogRoutes = require("./routes/blogRoutes");
const authRoutes = require("./routes/authRoutes");
const commentRoutes = require('./routes/commentRoutes');
const ratingRoutes = require('./routes/ratingRoutes');
const likeRoutes = require('./routes/likeRoutes');
const mongoose = require("mongoose");
const cors = require('cors');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes Section

// User - Registration - Login API
app.use("/auth", authRoutes);

// API Routes 
app.use("/api/blogs", blogRoutes);
app.use('/api/comments', commentRoutes);
app.use('/api/ratings', ratingRoutes);
app.use('/api/likes', likeRoutes);

app.use(errorHandler);

// app.get("", (req, res) => {
//   res.send("This is some response!");
// });

// const DB_URL =
//   "mongodb+srv://kabir_hasan:DITSMg3164D4OLX3@cluster0.l3ebd.mongodb.net/blog-website?retryWrites=true&w=majority";

// mongoose.set("strictQuery", false);
// mongoose
//   .connect(DB_URL, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   })
//   .then(() => {
//     console.log("Database Connected!");
//   })
//   .catch((e) => {
//     console.log("Error: ", e);
//   });

mongoose.set("strictQuery", false);
mongoose.connect(
  "mongodb://localhost:27017/kabir's-diary",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err) => {
    err ? console.log(err.message) : console.log("Successfully Connected!");
  }
);

app.listen(3000, () => {
  console.log("Running on ");
});
