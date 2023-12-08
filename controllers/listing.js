const Listing = require("../models/listings.js");
const mbxGeocoding = require("@mapbox/mapbox-sdk/services/geocoding");
const mapToken = process.env.MAPBOX_PUBLIC_API_KEY;
const geocodingClient = mbxGeocoding({ accessToken: mapToken });

module.exports.index = async (req, res) => {
  const allListings = await Listing.find({});
  res.render("listings/index.ejs", { data: allListings });
};

module.exports.renderNewListing = (req, res) => {
  res.render("listings/new.ejs");
};

module.exports.createListing = async (req, res) => {
  let response = await geocodingClient
    .forwardGeocode({
      query: req.body.listing.location,
      limit: 1,
    })
    .send();

  let url = req.file.path;
  let filename = req.file.filename;
  let listing = req.body.listing;
  const newListing = new Listing(listing);
  newListing.owner = req.user._id;
  newListing.image = { url, filename };
  newListing.geometry = response.body.features[0].geometry;
  await newListing.save();
  req.flash("success", "New Listing is created !");
  res.redirect("/listings");
};

module.exports.showListing = async (req, res) => {
  const { id } = req.params;
  const account = await Listing.findById(id)
    .populate({ path: "reviews", populate: { path: "author" } })
    .populate("owner");
  res.render("listings/show.ejs", { data: account });
};

module.exports.renderEditForm = async (req, res) => {
  const { id } = req.params;
  const data = await Listing.findById(id);
  res.render("listings/edit.ejs", { data });
};

module.exports.updateListing = async (req, res) => {
  const { id } = req.params;
  const listing = req.body.listing;
  const account = await Listing.findByIdAndUpdate(id, listing);

  if (typeof req.file !== "undefined") {
    let url = req.file.path;
    let filename = req.file.filename;
    account.image = { url, filename };
    await account.save();
  }
  req.flash("success", "Updated!");
  res.redirect(`/listings/${id}`);
};

module.exports.destroyListing = async (req, res) => {
  const { id } = req.params;
  await Listing.findByIdAndDelete(id);
  req.flash("error", "Deleted");
  res.redirect("/listings");
};

module.exports.sortListing = async (req, res) => {
  let { category } = req.params;
  const allListings = await Listing.find({ field: `${category}` });
  res.render("listings/index.ejs", { data: allListings });
};

module.exports.searchByName = async (req, res) => {
  let { name } = req.params;
  const listing = await Listing.find({ title: name });
  res.render("listings/index.ejs", { data: listing });
};
