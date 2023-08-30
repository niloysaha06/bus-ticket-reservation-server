import mongoose from "mongoose";

const ticketBookingSchema = mongoose.Schema(
  {
    userId: {
      type: String,
      ref: "User",
      required: [true, "User id is missing"],
    },
    busId: {
      type: String,
      ref: "Bus",
      required: [true, "Bus ID is missing"],
    },
    seatNumber: {
      type: String,
      required: [true, "seat Number is missing"],
    },
    gender: {
      type: String,
      required: [true, "gender Number is missing"],
    },
  },
  {
    timestamps: true,
  }
);

const TicketBooking = mongoose.model("TicketBooking", ticketBookingSchema);

export default TicketBooking;
