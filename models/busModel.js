import mongoose from "mongoose";

const busSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter bus name"],
    },
    route: {
      type: String,
      required: [true, "Please enter route"],
    },
    time: {
      type: String,
      required: [true, "Please select departure time"],
    },
  },
  {
    timestamps: true,
  }
);

const Bus = mongoose.model("Bus", busSchema);

export default Bus;
