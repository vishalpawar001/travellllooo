import React from 'react'
import { Card, CardBody } from 'reactstrap'
import './tour-card.css'
import calculateAvgRating from '../utils/avgRating'
import { BASE_URL } from '../utils/config'
import { NavLink, Link, useNavigate } from 'react-router-dom'

import useFetch from '../hooks/useFetch'

const TourCardAdmin = ({ tour }) => {
   const navigate = useNavigate()


   const { _id, title, city, photo, price, featured, reviews } = tour

   const { totalRating, avgRating } = calculateAvgRating(reviews)

   function handleDelete() {
      // Send a DELETE request using the fetch API
      console.log("jasdlkf");
      fetch(`${BASE_URL}/tours/admin/deleteTour/${_id}`, {
        method: 'post',
        body:"hiithereme"
      })
        .then((response) => {

          if (response.status === 200) {
            console.log('Package deleted successfully');
            window.location.reload();
          } else {
            // Handle any other status codes or errors here
            console.error('Failed to delete package');
          }
        })
        .catch((error) => {
          // Handle any network errors here
          console.error('Network error:', error);
        });
    }

   return (
      


      <div className='tour__card'>
         <Card>
            <div className="tour__img">
               <img src={photo} alt="tour-img" />
               {featured && <span>Featured</span>}
            </div>

            <CardBody>
               <div className="card__top d-flex align-items-center justify-content-between">
                  <span className="tour__location d-flex align-items-center gap-1">
                     <i className='ri-map-pin-line'></i> {city}
                  </span>
                  <span className="tour__rating d-flex align-items-center gap-1">
                     <i className='ri-star-fill'></i> {avgRating === 0 ? null : avgRating}
                     {totalRating === 0 ? ('Not rated') : (<span>({reviews.length})</span>)}

                  </span>
               </div>

               <h5 className='tour__title'><Link to={`/tours/${_id}`}>{title}</Link></h5>

               <div className="card__bottom d-flex align-items-center justify-content-between mt-3">
                  <h5>${price} <span> /per person</span></h5>

                  {/* <button className=' booking__btn'>
                     <Link to={`/tours/${_id}`}>Book Now</Link>
                  </button> */}
                  {/* <Link to={`/tours/${_id}`}> */}
                     <button onClick={handleDelete} className=' booking__btn'>Delete </button>
                  {/* </Link> */}
               </div>
            </CardBody>
         </Card>
      </div>
   )
};

export default TourCardAdmin;