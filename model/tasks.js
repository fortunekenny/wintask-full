const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Please enter your task title"],
    },
    alarmHour: {
      type: Number,
      required: [true, "Please enter the alarm hour(s)"],
      min: 0,
      max: 23,
    },
    alarmMinute: {
      type: Number,
      required: [true, "Please enter the alarm minute(s)"],
      min: 0,
      max: 59,
    },
    timeCreated: {
      type: Date,
      default: Date.now,
    },
    remainingTime: {
      type: Number,
      default: 0,
    },
    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
    cancel: {
      type: Boolean,
      default: false,
    },
    repeat: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Task", TaskSchema);
