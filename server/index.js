const express = require("express");
const http = require("http");
const cors = require("cors");
const User = require("./models/User.js");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const imageDownloader = require("image-downloader");
const fs = require("fs");
const multer = require("multer");
const { urldecode } = require("urldecode");

const cookieParser = require("cookie-parser");

const bcryptSalt = bcrypt.genSaltSync(10);
const app = express();
require("dotenv").config();

app.use(cookieParser());
app.use(express.json());
const PORT = 3001;

app.use(
  cors({
    credentials: true,
    origin: "http://localhost:5173",
  })
);
app.use("/uploads", express.static(__dirname + "/uploads"));
mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => console.log("Connected to MongoDB!"))
  .catch((err) => console.log(err));

app.get("/", (req, res) => {
  res.send("hello");
});

//resgister api:
app.post("/register", async (req, res) => {
  const { userName, email, password } = req.body;
  const newUser = await User.create({
    userName,
    email,
    password: bcrypt.hashSync(password, bcryptSalt),
  });
  res.json(newUser);
});

//login api:
app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const userEmail = await User.findOne({ email: email });
  if (userEmail) {
    const isPasswordValid = await bcrypt.compare(password, userEmail.password);
    if (isPasswordValid) {
      jwt.sign(
        {
          email: userEmail.email,
          id: userEmail._id,
          userName: userEmail.userName,
        },
        process.env.SECRET_KEY,
        {},
        (err, token) => {
          if (err) throw err;
          res.cookie("token", token).json(userEmail);
        }
      );
    } else {
      res.status(422).json("invalid credentials");
    }
  } else {
    res.json("no user found");
  }
});

//get profile:
app.get("/profile", (req, res) => {
  const { token } = req.cookies;
  if (token) {
    jwt.verify(token, process.env.SECRET_KEY, {}, (err, user) => {
      if (err) throw err;
      res.json(user);
    });
  } else {
    res.json(null);
  }
});
//logout api:
app.post("/logout", (req, res) => {
  res.cookie("token", "").json(true);
});

//upload by link api:
app.post("/upload-link", async (req, res) => {
  try {
    const { link } = req.body;
    console.log(link);
    const newName = Date.now() + ".jpeg";
    await imageDownloader.image({
      url: link,
      dest: __dirname + "/uploads/" + newName,
    });
    res.json(newName);
  } catch (error) {
    console.error("Error downloading image:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
//upload by local machine:
const photosMiddleware = multer({ dest: "uploads/" });

app.post("/upload", photosMiddleware.array("photos", 100), (req, res) => {
  const uploadedFiles = [];
  for (let i = 0; i < req.files.length; i++) {
    const { path, filename } = req.files[i];
    const newPath = path + "." + filename.split(".").pop(); // Update the file extension
    fs.renameSync(path, newPath);
    uploadedFiles.push(newPath.replace("uploads\\", ""));
    console.log(uploadedFiles);
  }
  res.json(uploadedFiles);
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
