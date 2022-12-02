
const mongoose = require("mongoose");

const CategorySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    icon: {
        type: String,
        required: false,
      },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Category", CategorySchema);