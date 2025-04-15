const Listing = require("../models/listing");
const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding');
const mapToken = process.env.MAP_TOKEN;
const geocodingClient = mbxGeocoding({ accessToken: mapToken});

module.exports.index = async (req , res) => {
    const allListings = await Listing.find({});
    res.render("listings/index.ejs",{allListings})
    };

module.exports.renderNewForm = (req, res ) => {
    res.render("listings/new.ejs");
};

module.exports.showListing = async(req, res) => {
    let {id} = req.params;
   const listing = await  Listing.findById(id).populate({
    path: "reviews",
    populate: {
    path: "author",
  },
})
  .populate("owner");
   if(!listing){
      req.flash("error", "Listing You requested for does not exits! ") ;
      res.redirect("/listings");
   }
   console.log(listing);
   res.render("listings/show.ejs", {listing});
 };

 module.exports.createListing = async (req, res) => {
  let newListing = new Listing(req.body.listing);
  newListing.owner = req.user._id;

  //Check if req.file exists before accessing its properties
  if (req.file) {
      newListing.image = {
          url: req.file.path,
          filename: req.file.filename
      };
  }

  await newListing.save();
  req.flash("success", "New Listing Created!");
  res.redirect("/listings");
};

/*
  // let response = await geocodingClient.forwardGeocode({
  //   query: req.body.listing.location,
  //   limit: 1,
  // })
  //   .send()
    
  //   console.log(response.body.features[0].geometry);
  //   res.send("done!");
*/
  //   let url = req.file.path;
  //   let filename = req.file.filename;
   
  //    const newListing =  new Listing(req.body.listing);
  //    newListing.owner = req.user._id;
  //    newListing.image = {url, filename};
  //    await newListing.save();
  //    req.flash("success", "New Listing Created!")
  //   res.redirect("/listings");
  
  // };

  module.exports.renderEditForm = async(req, res) => {
      let {id} = req.params;
      const listing = await  Listing.findById(id);
      if(!listing){
        req.flash("error", "Listing You requested for does not exits! ") ;
        res.redirect("/listings");
     }
      // let originalImageUrl = listing.image.url;
      // originalImageUrl = originalImageUrl.replace("/upload", "/upload/ w_250")
      res.render("listings/edit.ejs",{listing});
   };

   
   module.exports.updateListing = async (req, res) => {
    const { id } = req.params;
    const listing = await Listing.findById(id);

    if (!listing) {
        req.flash("error", "Listing does not exist!");
        return res.redirect("/listings");
    }

    const { title, description, price, location } = req.body.listing;
    listing.title = title;
    listing.description = description;
    listing.price = price;
    listing.location = location;

    if (req.file) {
        // Update the image if a new one is uploaded
        listing.image = {
            url: req.file.path,
            filename: req.file.filename
        };
    }

    await listing.save();
    req.flash("success", "Listing updated successfully!");
    res.redirect(`/listings/${listing._id}`);
};

    module.exports.destroyListing = async(req, res) => {
        let {id} = req.params;
       let deletedListing =  await Listing.findByIdAndDelete(id);
       console.log(deletedListing);
       req.flash("success", " Listing DELETED!")
       res.redirect("/listings");
     }
   