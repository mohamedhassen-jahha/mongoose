const mongoose = require("mongoose");
const { stringify } = require("qs");

const personSchema = {
  name: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
  },
  favouriteFood: {
    type: Array,
  },
};

module.exports = Person = mongoose.model("user", personSchema);
