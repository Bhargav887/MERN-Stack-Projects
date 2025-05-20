const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Listing = require("./models/listing.js");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");

const port = 8080;

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.engine("ejs", ejsMate);
app.use(express.static(path.join(__dirname, "/public")));

const mongo_url = "mongodb://127.0.0.1:27017/farbound";

main()
  .then((res) => {
    console.log("connected to database");
  })
  .catch((err) => {
    console.log(err);
    console.log("error in database!");
  });

async function main() {
  await mongoose.connect(mongo_url);
}

// index route
app.get("/listings", async (req, res) => {
  const allListings = await Listing.find({});
  res.render("listings/index.ejs", { allListings });
});

// new route
app.get("/listings/new", (req, res) => {
  res.render("listings/new.ejs");
});

// create route
app.post("/listings", async (req, res) => {
  const newListing = new Listing(req.body.listing);
  await newListing.save();
  res.redirect("/listings");
});

// edit route
app.get("/listings/:id/edit", async (req, res) => {
  let { id } = req.params;
  const listing = await Listing.findById(id);
  res.render("listings/edit.ejs", { listing });
});

// update route
app.put("/listings/:id", async (req, res) => {
  let { id } = req.params;
  await Listing.findByIdAndUpdate(id, { ...req.body.listing });
  res.redirect(`/listings/${id}`);
});

// delete route
app.delete("/listings/:id", async (req, res) => {
  let { id } = req.params;
  let deleteListing = await Listing.findByIdAndDelete(id);
  res.redirect("/listings");
});

// show route
app.get("/listings/:id", async (req, res) => {
  let { id } = req.params;
  const listing = await Listing.findById(id);
  res.render("listings/show.ejs", { listing });
});

// testlisting route
// app.get("/testlisting", async (req, res) => {
//     let samplelisting = new Listing({
//         title: "My Home",
//         discription: "this is my home!",
//         price: 1200,
//         location: "ladakh,Himalayas",
//         country: "India"
//     });
//     await samplelisting.save().then(() => {
//         console.log("saved to DB");
//         res.send("successful");
//     }).catch((err) => {
//         console.log(err);
//     }
//     )
// });

// root
app.get("/", (req, res) => {
  res.send("Hi , i am root!");
});

app.listen(port, () => {
  console.log(`Server is listening port:${port}`);
});
