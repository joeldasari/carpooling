import mongoose from "mongoose";

const rideSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "userModel",
    required: true,
  },
  name: {
    type: String,
    required: true,
  },

  phone: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: true,
  },

  vechicleID: {
    type: String,
    required: true,
  },

  vechicleName: {
    type: String,
    required: true,
  },

  dateTime: {
    type: String,
    required: true,
  },

  pickUp: {
    type: String,
    required: true,
  },

  drop: {
    type: String,
    required: true,
  },

  bidAmount: {
    type: Number,
    required: true,
  },

  seats: {
    type: Number,
    required: true,
  },
  booked: {
    type: Boolean,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  passengerName: String,
  passengerEmail: String,
  passengerPhone: String,
});

const rideModel = mongoose.model("rides", rideSchema);

export default rideModel;
