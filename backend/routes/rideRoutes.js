import rideModel from "../models/rideModel.js";

import express from "express";

const router = express.Router();

// creating a new ride
router.post("/new", async (req, res) => {
  try {
    const result = await rideModel.create(req.body);
    res.status(201).json(result);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});

// getting all available rides
router.get("/", async (req, res) => {
  try {
    const result = await rideModel.find();
    res.json(result);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});

// getting next rides of a user
router.get("/user/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const fetchUser = await rideModel.find({ email: id });
    res.json(fetchUser);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});

//update bookings, status, notifications
router.patch("/booking/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { seats, status } = req.body;

    const updateRide = await rideModel.findOneAndUpdate(
      { email: id },
      { $set: { seats, status } },
      { new: true }
    );

    res.json(updateRide);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});

export default router;
