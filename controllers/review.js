const Listing = require("../models/listings.js");
const Review = require("../models/review.js");

module.exports.addReview = async (req, res) => {
  const { id } = req.params;
  const { review } = req.body;
  const account = await Listing.findById(id);
  const newReview = new Review(review);
  newReview.author = req.user._id;
  account.reviews.push(newReview);
  newReview.save();
  account.save();
  req.flash("success", "Review Created🎉!");
  res.redirect(`/listings/${id}`);
};

module.exports.destroyRoute = async (req, res) => {
  const { id, reviewId } = req.params;

  //Deleting from the listing.review & then from the review collection

  await Listing.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
  await Review.findByIdAndDelete(reviewId);
  req.flash("error", "Deleted");
  res.redirect(`/listings/${id}`);
};
