const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Review = require("./review.js");

const listingSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    url: {
      type: String,
      required: true,
    },
    filename: {
      type: String,
      required: true,
    },
  },

  price: {
    type: Number,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },

  country: String,

  reviews: [
    {
      type: Schema.Types.ObjectId,
      ref: "Review", //Reference from which collection
    },
  ],

  owner: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  geometry: {
    type: {
      type: String, // Don't do `{ location: { type: String } }`
      enum: ["Point"], // 'location.type' must be 'Point'
      required: true,
    },
    coordinates: {
      type: [Number],
      required: true,
    },
  },

  field: {
    type: String,
    required: true,
  },
});

//Creating the post middleware so that if the listing is deleted then related reviews will be deleted also-- Here the post mw has the access of the listing schema model which has been deleted

listingSchema.post("findOneAndDelete", async (listing) => {
  await Review.deleteMany({ _id: { $in: listing.reviews } });
});

const Listing = mongoose.model("Listing", listingSchema);

//Exporting it as listing

module.exports = Listing;
