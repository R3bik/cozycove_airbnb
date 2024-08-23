const mongoose = require("mongoose");

const Places = new mongoose.Schema({
  owner: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  title: {
    type: String,
  },
  address: String,
  photos: [String],
  description: String,
  perks: [String],
  extraInfo: String,
  checkIn: Number,
  maxGuest: Number,
});
const PlaceModel = mongoose.model("Place", placeSchema);

module.exports = PlaceModel;
