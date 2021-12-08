const router = require("express").Router();
const Person = require("../Models/personSchema");

//   Create and Save a Record of a Model:
const newPerson = new Person({
  name: "Ahmed",
  age: 19,
  favouriteFood: ["Makrouna", "Lablabi"],
});

newPerson
  .save()
  .then((data) => {
    return data;
  })
  .catch((err) => {
    return err;
  });

// Creating an Array of PPL

const arrayofpeople = [
  { name: "hassen", age: 21, favouriteFood: ["pizza", "penne"] },
  { name: "mohamed", age: 22, favouriteFood: ["kifta", "makloub"] },
];

// Create several people with Model.create(), using the function argument arrayOfPeople.
Person.create(arrayofpeople);

// Use model.find() to Search Your Database
router.get("/getpersonbyname/:name", (req, res) => {
  Person.find({ name: req.params.name }, (err, data) => {
    if (err) return err;
    res.json(data);
  });
});

// Use model.findOne() to Return a Single Matching Document from Your Database
router.get("/getpersonbyfood/:food", (req, res) => {
  Person.findOne({ favouriteFood: req.params.food }, (err, data) => {
    if (err) return err;
    res.json(data);
  });
});

// Use model.findById() to Search Your Database By _id
router.get("/getpersonbyid/:id", (req, res) => {
  Person.findById({ _id: req.params.id }, (err, data) => {
    if (err) return err;
    res.json(data);
  });
});

// Perform Classic Updates by Running Find, Edit, then Save
router.put("/edit/:Id/food/:food", (req, res) => {
  Person.findById(req.params.Id, (err, data) => {
    if (err) {
      return err;
    } else {
      data.favouriteFood.push(req.params.food);
      data.save((err, person) => {
        if (err) return err;
        res.json(person);
      });
    }
  });
});

// Perform New Updates on a Document Using model.findOneAndUpdate()
router.put("/findedit/:Id", (req, res) => {
  Person.findOneAndUpdate(
    { _id: req.params.Id },
    { $set: { age: 1000000 } },
    { new: true },
    function (err, doc) {
      if (err) {
        return err;
      } else {
        res.send("Updated");
      }
    }
  );
});

// Delete One Document Using model.findByIdAndRemove

router.delete("/delete/:Id", (req, res) => {
  Person.findByIdAndRemove(req.params.Id, function (err, data) {
    if (err) return err;
    res.send("deleted");
  });
});

// MongoDB and Mongoose - Delete Many Documents with model.remove()

router.delete("/deletemany/:name", (req, res) => {
  Person.remove({ name: req.params.name }, function (err) {
    if (err) return err;
    res.send("deleted");
  });
});

// Chain Search Query Helpers to Narrow Search Results

router.get("/listpeople", (req, res) => {
  Person.find({ favouriteFood: { $all: ["pizza"] } })
    .sort({ name: "asc" })
    .limit(2)
    .select("-age")
    .exec((err, data) => {
      if (err) return err;
      res.json(data);
    });
});

module.exports = router;
