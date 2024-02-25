import bookedModel from "../models/bookedModel.js";
import rideModel from "../models/rideModel.js";
import userModel from "../models/userModel.js";

import express from "express";

const router = express.Router();

// create a new ride by a rider
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
      booked,
      gender,
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
        booked,
        gender,
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
        booked,
        gender,
      });
      res.status(201).json(newRide);
    }
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});

// display all available rides to the passengers (book a ride page)
router.get("/", async (req, res) => {
  try {
    const result = await rideModel.find();
    res.json(result);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});

// display all created rides of a rider (your rides)
router.get("/user/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const fetchUser = await rideModel.find({ email: id });
    res.json(fetchUser);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});

// deleting a particular ride by rider

// router.delete("/delete/:id", async (req, res) => {
//   try {
//     const { id } = req.params;
//     await rideModel.findByIdAndDelete(id);
//     res.json({ message: "Deleted Successfully" });
//   } catch (e) {
//     res.status(500).json({ message: e.message });
//   }
// });

// show booked rides to the passenger
router.get("/bookedRides/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const bookings = await bookedModel.find({ userEmail: id });
    res.json(bookings);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});

// ride booked by a passenger (your booking)
router.post("/booked", async (req, res) => {
  try {
    const {
      carOwner,
      carOwnerPhone,
      carOwnerEmail,
      userName,
      userEmail,
      userPhone,
      pickUp,
      drop,
      amount,
      booked,
      rideId,
    } = req.body;
    console.log(req.body);
    const isUserExists = await userModel.findOne({ userEmail });
    console.log(isUserExists);
    if (isUserExists) {
      const newBooking = await bookedModel.create({
        rideId,
        carOwner,
        carOwnerEmail,
        carOwnerPhone,
        userName,
        userEmail,
        userPhone,
        pickUp,
        drop,
        amount,
        booked,
      });
      const updateRide = await rideModel.findByIdAndUpdate(
        { _id: rideId },
        {
          $set: {
            booked: true,
            passengerName: userName,
            passengerEmail: userEmail,
            passengerPhone: userPhone,
          },
        },
        { new: true }
      );
      console.log(updateRide);
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
        rideId,
        carOwnerPhone,
        userName,
        userEmail,
        userPhone,
        pickUp,
        drop,
        amount,
        booked,
      });
      res.status(201).json(newBooking);
    }
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});

export default router;
