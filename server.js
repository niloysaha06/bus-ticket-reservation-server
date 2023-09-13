import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import Bus from "./models/busModel.js";
import TicketBooking from "./models/ticketBookingModel.js";
import User from "./models/userModel.js";

const app = express();

app.use(cors());
app.use(express.json());
// bus-ticket-reservation
// c0uQIH9iRduhIoAZ
mongoose
  .connect(
    "mongodb+srv://bus-ticket-reservation:c0uQIH9iRduhIoAZ@cluster0.ya2sd.mongodb.net/?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("Connected to Mongo DB");
  })
  .catch((error) => {
    console.log(error);
  });

//get bus list api
app.get("/buses", async (req, res) => {
  try {
    const buses = await Bus.find({});
    res.status(200).json(buses);
  } catch (e) {
    console.log(e.message);
    res.status(500).json({ message: e.message });
  }
});

//store bus list api
app.post("/bus", async (req, res) => {
  try {
    const bus = await Bus.create(req.body);
    res.status(200).json(bus);
  } catch (e) {
    console.log(e.message);
    res.status(500).json({ message: e.message });
  }
});

//get a specific bus details
app.get("/bus/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const bus = await Bus.findById(id);
    if (bus) {
      const ticketBookings = await TicketBooking.find({ busId: id });
      const busWithTicketBookings = {
        bus: bus,
        ticketBookings: ticketBookings,
      };
      res.status(200).json(busWithTicketBookings);
    } else {
      res
        .status(404)
        .json({ message: `No bus details found with this id: ${id}` });
    }
  } catch (e) {
    console.log(e.message);
    res.status(500).json({ message: e.message });
  }
});

//book ticket api
app.post("/book-ticket", async (req, res) => {
  try {
    let user = {};
    const busId = req.body.busId;
    const seatNumber = req.body.seatNumber;
    const gender = req.body.gender;

    user = await User.findOne({ email: req.body.email });
    console.log(user);
    if (user === null || user.length === 0) {
      user = await User.create(req.body);
    }

    if (user) {
      const checkSeatBookingStatus = await TicketBooking.find({
        busId: busId,
        seatNumber: seatNumber,
      });
      if (checkSeatBookingStatus.length > 0) {
        return res.status(404).json({ message: "This seat is already booked" });
      }

      const ticketBooking = await TicketBooking.create({
        userId: user["_id"],
        busId: busId,
        seatNumber: seatNumber,
        gender: gender,
      });
      return res.status(200).json(ticketBooking);
    }
    return res.status(404).json({ message: "Failed to create user!" });
  } catch (e) {
    console.log(e.message);
    res.status(500).json({ message: e.message });
  }
});

app.get("/reset-bus/:id", async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id);
    const deleteTicketBooking = await TicketBooking.deleteMany({ busId: id });
    res.status(200).json({ message: "Reset completed!" });
  } catch (e) {
    console.log(e.message);
    res.status(500).json({ message: e.message });
  }
});

app.get("/reset", async (req, res) => {
  try {
    const deleteTicketBooking = await TicketBooking.deleteMany({});
    res.status(200).json({ message: "Reset completed!" });
  } catch (e) {
    console.log(e.message);
    res.status(500).json({ message: e.message });
  }
});

app.listen(3000, () => {
  console.log("Listening");
});
