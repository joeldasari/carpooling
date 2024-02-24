import mongoose from "mongoose";

const bookedSchema = new mongoose.Schema({
  rideId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  carOwner: {
    type: String,
    required: true,
  },
  carOwnerPhone: {
    type: String,
    required: true,
  },
  carOwnerEmail: {
    type: String,
    required: true,
  },
  userName: {
    type: String,
    required: true,
  },
  userEmail: {
    type: String,
    required: true,
  },
  userPhone: {
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
  amount: {
    type: Number,
    required: true,
  },
  booked: {
    type: Boolean,
    required: true,
  },
});

const bookedModel = mongoose.model("bookedModel", bookedSchema);

export default bookedModel;
