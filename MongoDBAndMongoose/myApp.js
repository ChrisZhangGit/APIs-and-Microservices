require("dotenv").config();

//Install and Set Up Mongoose
const mongoose = require("mongoose");

mongoose.connect(
  "mongodb+srv://new-user:15137900790@cluster0.8zreq.mongodb.net/freecodecamp?retryWrites=true&w=majority"
);

//Create a Model
const Schema = mongoose.Schema;

const personSchema = new Schema({
  name: { type: String, required: true },
  age: Number,
  favoriteFoods: [String]
});

const Person = mongoose.model("Person", personSchema);

//Create and Save a Record of a Model
const createAndSavePerson = done => {
  var davidJones = new Person({
    name: "David Jones",
    age: 99,
    favoriteFoods: ["meats", "noodles"]
  });
  davidJones.save(function(err, data) {
    if (err) return console.error(err);
    done(null, data);
  });
};

//Create Many Records with model.create()
var arrayOfPeople = [
  { name: "Kevin", age: 35, favoriteFoods: ["Soup"] },
  { name: "Grace", age: 36, favoriteFoods: ["Chicken"] },
  { name: "Jenkins", age: 37, favoriteFoods: ["Pork"] }
];
const createManyPeople = (arrayOfPeople, done) => {
  Person.create(arrayOfPeople, function(err, people) {
    if (err) return console.log(err);
    done(null, people);
  });
};

//Use model.find() to Search Your Database
const findPeopleByName = (personName, done) => {
  Person.find({ name: personName }, function(err, personFound) {
    if (err) return console.log(err);
    done(null, personFound);
  });
};

//Use model.findOne() to Return a Single Matching Document from Your Database
const findOneByFood = (food, done) => {
  Person.findOne({ favoriteFoods: food }, function(err, data) {
    if (err) return console.log(err);
    done(null, data);
  });
};

//Use model.findById() to Search Your Database By _id
const findPersonById = (personId, done) => {
  Person.findById(personId, function(err, data) {
    if (err) return console.log(err);
    done(null, data);
  });
};

//Perform Classic Updates by Running Find, Edit, then Save
const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";

  Person.findById(personId, (err, person) => {
    if (err) return console.log(err);

    person.favoriteFoods.push(foodToAdd);

    person.save((err, updatedPerson) => {
      if (err) return console.log(err);
      done(null, updatedPerson);
    });
  });
};

//Perform New Updates on a Document Using model.findOneAndUpdate()
const findAndUpdate = (personName, done) => {
  const ageToSet = 20;

  Person.findOneAndUpdate(
    { name: personName },
    { age: ageToSet },
    { new: true },
    (err, updatedDoc) => {
      if (err) return console.log(err);
      done(null, updatedDoc);
    }
  );
};

//Delete One Document Using model.findByIdAndRemove
const removeById = (personId, done) => {
  Person.findByIdAndRemove(personId, (err, removedDoc) => {
    if (err) return console.log(err);
    done(null, removedDoc);
  });
};

//Delete Many Documents with model.remove()
const removeManyPeople = done => {
  const nameToRemove = "Mary";
  Person.remove({ name: nameToRemove }, (err, response) => {
    if (err) return console.log(err);
    done(null, response);
  });
};

//Chain Search Query Helpers to Narrow Search Results
const queryChain = done => {
  const foodToSearch = "burrito";
  Person.find({ favoriteFoods: foodToSearch })
    .sort({ name: "asc" })
    .limit(2)
    .select("-age")
    .exec(function(error, people) {
      if (error) {
        done(error);
      }
      done(null, people);
    });
};

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
