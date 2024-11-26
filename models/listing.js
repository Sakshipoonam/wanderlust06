const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const listingSchema = new Schema({
    title:{
      type: String,
      required: true,
    } ,
    description: String,
    image: {
        type: String,
        default:"https://unsplash.com/photos/a-body-of-water-with-a-city-in-the-background-dHaI_U2qSZ0",
        set: (v) => v === "" ? "https://unsplash.com/photos/a-body-of-water-with-a-city-in-the-background-dHaI_U2qSZ0": v,
    },
    price: Number,
    location: String,
    country: String,
});

const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;