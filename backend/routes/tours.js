import express from 'express'
import { createTour, deleteTour, getAllTour, getFeaturedTour, getSingleTour, getTourBySearch, getTourBySearch2, getTourCount, updateTour , createTourAdmin, deleteTourAdmin, getSingleTourAdmin, getAllBookingsAdmin, deleteBookingAdmin, getAllTours} from '../Controllers/tourControllers.js'

import { verifyAdmin } from '../utils/verifyToken.js'
  
const router = express.Router()

//Create new tour 
router.post('/', verifyAdmin, createTour)

//Update tour 
router.put('/:id', verifyAdmin, updateTour)

//Delete tour 
router.delete('/:id', verifyAdmin, deleteTour)

//Get single tour 
router.get('/:id', getSingleTour)

//Get all tour 
router.get('/', getAllTour)

//Get tour by search  
router.get("/search/getTourBySearch", getTourBySearch)
router.get("/search/getTourBySearch2", getTourBySearch2)
router.get("/search/getFeaturedTour", getFeaturedTour)
router.get("/search/getTourCount", getTourCount)


router.get("/admin/getAllTours", getAllTour); //
router.get("/admin/getAllTourss", getAllTours); //
router.post("/admin/createTour", createTourAdmin); //
router.post("/admin/deleteTour/:id", deleteTourAdmin);  //
router.post("/admin/getSingleTour", getSingleTourAdmin); //
router.post("/admin/deleteBooking", deleteBookingAdmin); //
router.get("/admin/getallbookings", getAllBookingsAdmin); //  






export default router