import bookedModel from "../models/bookedModel.js";
import rideModel from "../models/rideModel.js";
import userModel from "../models/userModel.js";

import express from "express";

const router = express.Router();

// creating a new ride
router.post("/new", async (req, res) => {
  try {
    const {
      email,
      name,
      phone,
      vechicleID,
      vechicleName,
      dateTime,
      pickUp,
      drop,
      bidAmount,
      seats,
    } = req.body;
    const isUserExists = await userModel.findOne({ userEmail: email });
    if (isUserExists) {
      const newRide = await rideModel.create({
        user: isUserExists._id,
        name,
        phone,
        email,
        vechicleID,
        vechicleName,
        dateTime,
        pickUp,
        drop,
        bidAmount,
        seats,
      });
      res.status(201).json(newRide);
    } else {
      const newUser = await userModel.create({
        userEmail: email,
        userName: name,
        userPhone: phone,
      });
      const newRide = await rideModel.create({
        user: newUser._id,
        name,
        phone,
        email,
        vechicleID,
        vechicleName,
        dateTime,
        pickUp,
        drop,
        bidAmount,
        seats,
      });
      res.status(201).json(newRide);
    }
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

// deleting a particular ride

router.delete("/delete/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await rideModel.findByIdAndDelete(id);
    res.json({ message: "Deleted Successfully" });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});

// show user bookings

router.get("/bookedRides/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const bookings = await bookedModel.find({ userEmail: id });
    res.json(bookings);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});

// user booked a ride
router.post("/booked", async (req, res) => {
  try {
    const {
      carOwner,
      carOwnerPhone,
      carOwnerEmail,
      bookedSeats,
      userName,
      userEmail,
      userPhone,
      pickUp,
      drop,
      amount,
    } = req.body;
    console.log(req.body);
    const isUserExists = await userModel.findOne({ userEmail });
    console.log(isUserExists);
    if (isUserExists) {
      const newBooking = await bookedModel.create({
        carOwner,
        carOwnerEmail,
        carOwnerPhone,
        bookedSeats,
        userName,
        userEmail,
        userPhone,
        pickUp,
        drop,
        amount,
      });
      console.log(newBooking);
      res.status(201).json(newBooking);
    } else {
      await userModel.create({
        userEmail,
        userName,
        userPhone,
      });
      const newBooking = await bookedModel.create({
        carOwner,
        carOwnerEmail,
        carOwnerPhone,
        bookedSeats,
        userName,
        userEmail,
        userPhone,
        pickUp,
        drop,
        amount,
      });
      res.status(201).json(newBooking);
    }
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});

export default router;
