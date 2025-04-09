const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js"); 

const Listing = require("../models/listing.js");
const {isLoggedIn, isOwner , validateListing} = require("../middleware.js");
const multer = require('multer');
const{storage} = require("../cloudConfig.js");
const upload = multer({ storage});

const listingController = require("../controllers/listings.js");

router
.route("/")
.get(wrapAsync(listingController.index))

.post( 
  isLoggedIn , 
  upload.single('listing[image]'),
  wrapAsync(listingController.createListing));




//New Route
router.get("/new", isLoggedIn, listingController.renderNewForm);

// router.put("/:id", isLoggedIn, isOwner, upload.single('listing[image]'), validateListing, wrapAsync(async (req, res) => {
//   let { id } = req.params;
//   console.log("Received Data:", req.body.listing); 
  
//   let updatedListing = await Listing.findByIdAndUpdate(id, { ...req.body.listing });
  
//   console.log("Updated Listing:", updatedListing); // Debug log
//   res.redirect(`/listings/${id}`);
// }));

  //edit route 
 router.get("/:id/edit", isLoggedIn, isOwner,
   wrapAsync(listingController.renderEditForm));


 

module.exports = router;
