const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");


const app = express();
app.use(cors());
app.use(express.json());

mongoose
  .connect(
    "mongodb+srv://suhasinim1100_db_user:Suhasini2000@cluster0.7urhgex.mongodb.net/loginDB?retryWrites=true&w=majority",
  )
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

const UserSchema = new mongoose.Schema({
  name: String,
  phone: String,
});

const User = mongoose.model("User", UserSchema);

// API - Save User
app.post("/login", async (req, res) => {
  const { name, phone } = req.body;

  try {
    const newUser = new User({ name, phone });
    await newUser.save();
    res.json({ message: "User Saved Successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error saving user" });
  }
});

app.listen(3001, () => {
  console.log("Server running on http://localhost:3001");
});
