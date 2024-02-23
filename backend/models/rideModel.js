import mongoose from "mongoose";

const rideSchema = mongoose.Schema({
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

  bookedSeats: Number,

  status: String,

  bookingDetails: [],

  yourBookings: [],

  history: [],

  notifications: [],
});

const rideModel = mongoose.model("rides", rideSchema);

export default rideModel;
