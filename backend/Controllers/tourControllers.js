import Booking from "../models/Booking.js";
import Tour from "../models/Tour.js";

//Create new tour
export const createTour = async (req, res) => {
  const newTour = new Tour(req.body);

  try {
    const savedTour = await newTour.save();

    res
      .status(200)
      .json({
        success: true,
        message: "Successfully created",
        data: savedTour,
      });
  } catch (error) {
    res
      .status(500)
      .json({ success: true, message: "Failed to create. Try again!" });
  }
};

//Update Tour
export const updateTour = async (req, res) => {
  const id = req.params.id;

  try {
    const updatedTour = await Tour.findByIdAndUpdate(
      id,
      {
        $set: req.body,
      },
      { new: true }
    );

    res
      .status(200)
      .json({
        success: true,
        message: "Successfully updated",
        data: updatedTour,
      });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to update" });
  }
};

//Delete Tour
export const deleteTour = async (req, res) => {
  const id = req.params.id;
  console.log("good afternoon");

  try {
    await Tour.findByIdAndDelete(id);

    res.status(200).json({ success: true, message: "Successfully deleted" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to delete" });
  }
};

//Getsingle Tour
export const getSingleTour = async (req, res) => {
  const id = req.params.id;

  try {
    const tour = await Tour.findById(id).populate("reviews");

    res
      .status(200)
      .json({ success: true, message: "Successfully", data: tour });
  } catch (error) {
    res.status(404).json({ success: false, message: "Not Found" });
  }
};

//Get All Tour
export const getAllTour = async (req, res) => {
  //For pagination
  const page = parseInt(req.query.page);

  //console.log(page)

  try {
    const tours = await Tour.find({})
      .populate("reviews")
      .skip(page * 8)
      .limit(8);

    res
      .status(200)
      .json({
        success: true,
        count: tours.length,
        message: "Successfully",
        data: tours,
      });
  } catch (error) {
    res.status(404).json({ success: false, message: "Not Found" });
  }
};


export const getAllTours = async (req, res) => {
  const page = parseInt(req.query.page);

  try {
    const tours = await Tour.find({})
      .populate("reviews")
      .skip(page * 8)
      // .limit(8);

    res
      .status(200)
      .json({
        success: true,
        count: tours.length,
        message: "Successfully",
        data: tours,
      });
  } catch (error) {
    res.status(404).json({ success: false, message: "Not Found" });
  }
};

// Get tour by search
export const getTourBySearch = async (req, res) => {
  // hear 'i' means case sensitive
  const city = new RegExp(req.query.city, "i");
  const distance = parseInt(req.query.distance);
  const maxGroupSize = parseInt(req.query.maxGroupSize);

  try {
    // gte means greater than equal
    const tours = await Tour.find({
      city,
      distance: { $gte: distance },
      maxGroupSize: { $gte: maxGroupSize },
    }).populate("reviews");

    res
      .status(200)
      .json({ success: true, message: "Successfully", data: tours });
  } catch (error) {
    res.status(404).json({ success: false, message: "Not Found" });
  }
};

export const getTourBySearch2 = async (req, res) => {
  const searchQuery = {};

  if (req.query.city) {
    searchQuery.city = new RegExp(req.query.city, "i");
  }

  if (req.query.distance) {
    searchQuery.distance = { $lte: parseInt(req.query.distance) };
  }

  if (req.query.maxGroupSize) {
    searchQuery.maxGroupSize = { $gte: parseInt(req.query.maxGroupSize) };
  }

  try {
    const tours = await Tour.find(searchQuery).populate("reviews");
    console.log(tours);

    res
      .status(200)
      .json({ success: true, message: "Successfully", data: tours });
  } catch (error) {
    res.status(404).json({ success: false, message: "Not Found" });
  }
};

//Get featured Tour
export const getFeaturedTour = async (req, res) => {
  //console.log(page)

  try {
    const tours = await Tour.find({ featured: true })
      .populate("reviews")
      .limit(8);

    res
      .status(200)
      .json({ success: true, message: "Successfully", data: tours });
  } catch (error) {
    res.status(404).json({ success: false, message: "Not Found" });
  }
};

//Get tour count
export const getTourCount = async (req, res) => {
  try {
    const tourCount = await Tour.estimatedDocumentCount();

    res.status(200).json({ success: true, data: tourCount });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to fetch" });
  }
};

// my created routes 

export const createTourAdmin = async (req, res) => {
  console.log("clicked")
  const newTour = new Tour(req.body);
  try {
    const savedTour = await newTour.save();
    res.status(200).json({success: true,message: "Successfully created",data: savedTour,});
  } catch (error) {
    res.status(500).json({ success: true, message: "Failed to create. Try again!" });
  }
};


export const deleteTourAdmin = async (req, res) => {
  
  console.log(req.params.id);
  const id = req.params.id;

  try {
    await Tour.findByIdAndDelete(id);

    res.status(200).json({ success: true, message: "Successfully deleted" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to delete" });
  }
};

export const getSingleTourAdmin = async (req, res) => {
  const id = req.body._id;

  try {
    const tour = await Tour.findById(id).populate("reviews");

    res
      .status(200)
      .json({ success: true, message: "Successfully", data: tour });
  } catch (error) {
    res.status(404).json({ success: false, message: "Not Found" });
  }
};

export const getAllBookingsAdmin = async(req,res)=>{
    try{
        const bookings = await Booking.find({});
        res
          .status(200)
          .json({success:true, message:"Successsfully", data: bookings});
    }catch(error){
      res.status(404).json({ success: false, message: "Not Found" });

    }
}
export const tempAdmin = async(req,res)=>{
    try{
        const bookings = await Booking.find({});
        res
          .status(200)
          .json({success:true, message:"Successsfully", data: bookings});
    }catch(error){  
      res.status(404).json({ success: false, message: "Not Found" });

    }
}
export const deleteBookingAdmin = async(req,res)=>{

    try{
        const id = req.body._id;
        console.log(id);
        const booking = await Booking.findOneAndDelete({_id:id});  
        const bookings = await Booking.find({});
        console.log(booking);
        res
          .status(200)
          .json({success:true, message:"Successsfully", data:bookings});
    }catch(error){
      res.status(404).json({ success: false, message: "Not Found" });

    }
}



