const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");

const mongo_url = "mongodb://127.0.0.1:27017/farbound";

main().then((res) => {
    console.log("connected to database");
}).catch((err) => {
    console.log(err);
    console.log("error in database!");
})

async function main() {
    await mongoose.connect(mongo_url);
}

const initDb = async () => {
    await Listing.deleteMany({});
    await Listing.insertMany(initData.data);
    console.log("data is initialized!");
}

initDb();