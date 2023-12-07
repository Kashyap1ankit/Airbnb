const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listings.js");

main()
  .then((res) => console.log("Database connected"))
  .catch((err) => console.log(err));

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/Airbnb");
}

//Getting the sample initilizing data  and then clearling all the exisiting data in the database and then adding it

const initDB = async function () {
  console.log(initData);
  await Listing.deleteMany({});
  await Listing.insertMany(initData.data);
};

initDB();
