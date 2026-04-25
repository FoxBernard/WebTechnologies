const mongoose = require("mongoose");

const EventsSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      trim: true,
      required: true,
    },

    description: {
      type: String,
      default: "",
    },

    date: {
      start: {
        type: Date,
        required: true,
      },
      end: {
        type: Date,
        required: true,
      },
    },

    location: {
      type: String,
      required: true,
    },

    venue: {
      type: String,
      required: true,
    },

    isPrivate: {
      type: Boolean,
      default: false,
    },

    hostID: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Event", EventsSchema);