const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const authRoute = require("./routes/auth");
const userRoute = require("./routes/user");
const postRoute = require("./routes/post");
const multer = require("multer");
const path = require("path");

dotenv.config();
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(console.log("Connection Successful"))
  .catch((err) => {
    console.log(err);
  });

app.use("/images", express.static(path.join(__dirname, "/images")));

// File Uploading
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images/post");
  },
  filename: (req, file, cb) => {
    cb(null, req.body.name);
    // cb(null, file.originalname); //for postman
  },
});

const upload = multer({ storage: storage });
app.post("/api/upload", upload.single("file"), (req, res) => {
  res.status(200).json("File has been uploaded");
});

app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/posts", postRoute);

app.listen("8000", () => {
  console.log("Backend is running at port 8000");
});
