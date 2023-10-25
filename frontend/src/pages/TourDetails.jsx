import React, { useState, useRef, useEffect, useContext } from 'react'
import '../styles/tour-details.css'
// import tourData from '../assets/data/tours'
import { Container, Row, Col, Form, ListGroup, Button } from 'reactstrap'
import { useParams } from 'react-router-dom'
import calculateAvgRating from '../utils/avgRating'
import avatar from '../assets/images/avatar.jpg'
import Booking from '../components/Booking/Booking'
import Newsletter from '../shared/Newsletter'
import useFetch from '../hooks/useFetch'
import { BASE_URL } from '../utils/config'
import { AuthContext } from '../context/AuthContext'
import Header from '../components/Header/Header'
import { imageDB } from '../utils/firebaseConfig'
import {ref, uploadBytes,getDownloadURL } from 'firebase/storage';
import { v4 as uuid } from 'uuid';



const TourDetails = () => {
   const { id } = useParams()
   const reviewMsgRef = useRef('')
   const [tourRating, setTourRating] = useState(null)
   const { user } = useContext(AuthContext);

   //
   const [image, setImage] = useState(null);
   const [imgUrl , setImgUrl] = useState("");
  const [isUploading, setIsUploading] = useState(false);

   // fetch data from database
   const { data: tour, loading, error } = useFetch(`${BASE_URL}/tours/${id}`)

   const { photo, title, desc, price, reviews, city, address, distance, maxGroupSize } = tour

   const {  avgRating } = calculateAvgRating(reviews)

   const options = { day: 'numeric', month: 'long', year: 'numeric' }

      
//   const handleImageUpload =async()=>{
//    setIsUploading(true);

//    const img =ref(imageDB,`files/review${ct}`);
//    uploadBytes(img, image)
//      .then((snapshot) => {
//        setCt(ct + 1);
//        getDownloadURL(snapshot.ref).then((url) => {
//          setImgUrl(url);
//          console.log(ct,": : ", imgUrl);
//          setIsUploading(false);        
//        });
//      })
//      .catch((error) => {
//        console.error('Error uploading image to Firebase:', error);
//      });
//  }

const handleImageUpload = async () => {
   setIsUploading(true); 
   const unique_id = uuid(); 
   const small_id = unique_id.slice(0,8);
   try {
     const imgRef = ref(imageDB, `files/review${small_id}`);
     const snapshot = await uploadBytes(imgRef, image);
     const url = await getDownloadURL(snapshot.ref);
     setImgUrl(url);
     setIsUploading(false);
   } catch (error) {
     console.error('Error uploading image to Firebase:', error);
   }
 };
 




   const submitHandler = async e => {
      e.preventDefault()
      const reviewText = reviewMsgRef.current.value
      try {
         if (!user || user === undefined || user === null) {
            alert('Please sign in')
         }
         const reviewObj = {
            username: user?.username,
            reviewText,
            rating: tourRating,
            photo:imgUrl
         }
         console.log("photoUrlis:", reviewObj.photo );

         const res = await fetch(`${BASE_URL}/review/${id}`, {
            method: 'post',
            headers: {
               'content-type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify(reviewObj)
         })
         
         const result = await res.json()
         if (!res.ok) {
            return alert(result.message)
         }
         alert(result.message)
      } catch (error) {
         alert(error.message)
      }
   }

   useEffect(() => {
      window.scrollTo(0, 0)
   }, [tour])



   const squareImageStyle = {
      width: '350px',
      height: '250px',
      borderRadius:'0'
    };

   return (
      <>
      <Header/>

      <section>
         <Container>
            {loading && <h4 className='text-center pt-5'>LOADING.........</h4>}
            {error && <h4 className='text-center pt-5'>{error}</h4>}
            {
               !loading && !error &&
               <Row>
                  <Col lg='8'>
                     <div className="tour__content">
                        <img src={photo} alt="" />

                        <div className="tour__info">
                           <h2>{title}</h2>
                           <div className="d-flex align-items-center gap-5">
                              <span className="tour__rating d-flex align-items-center gap-1">
                                 <i className='ri-star-fill' style={{ 'color': 'var(--secondary-color)' }}></i> {avgRating === 0 ? null : avgRating}
                                 {avgRating === 0 ? ('Not rated') : (<span>({reviews?.length})</span>)}
                              </span>

                              <span><i className='ri-map-pin-fill'></i> {address}</span>
                           </div>

                           <div className="tour__extra-details">
                              <span><i className='ri-map-pin-2-line'></i> {city}</span>
                              <span><i className='ri-money-dollar-circle-line'></i> {price}/ per person</span>
                              <span><i className='ri-map-pin-time-line'></i> {distance} k/m</span>
                              <span><i className='ri-group-line'></i> {maxGroupSize} people</span>
                           </div>
                           <h5>Description</h5>
                           <p>{desc}</p>
                        </div>

                        {/* ============ TOUR REVIEWS SECTION START ============ */}
                        <div className="tour__reviews mt-4">
                           <h4>Reviews ({reviews?.length} reviews)</h4>

                           <Form onSubmit={submitHandler}>
                              <div className="d-flex align-items-center gap-3 mb-4 rating__group">
                                 <span onClick={() => setTourRating(1)}>1 <i className='ri-star-s-fill'></i></span>
                                 <span onClick={() => setTourRating(2)}>2 <i className='ri-star-s-fill'></i></span>
                                 <span onClick={() => setTourRating(3)}>3 <i className='ri-star-s-fill'></i></span>
                                 <span onClick={() => setTourRating(4)}>4 <i className='ri-star-s-fill'></i></span>
                                 <span onClick={() => setTourRating(5)}>5 <i className='ri-star-s-fill'></i></span>
                              </div>

                              <div className="review__input">

                              {/* // */}

      
                              <div style={{border:"2px solid orange", width:"500px", marginLeft:"10px", padding:"5px 20px", borderRadius:"20px 0 0 20px"}}>
                                 <label>Photo:</label>
                                 <input type="file" onChange={(e) => setImage(e.target.files[0])} />
                                 <p>
                                 {isUploading && <span> uploading...</span>}
                                 </p>
                                <Button onClick={handleImageUpload}> Upload IMage </Button>
         
                              </div>


                              {/* // */}


                                 <input type="text" ref={reviewMsgRef} placeholder='share your thoughts' style={{marginLeft:"20px"}} required />
                                 <button className='btn primary__btn text-white' type='submit'>
                                    Submit
                                 </button>
                              </div>
                           </Form>

                           <ListGroup className='user__reviews'>
                              {
                                 reviews?.map(review => (
                                    <div className="review__item">
                                       <img src={review.photo} alt=""  style={squareImageStyle} />

                                       <div className="w-100 ">
                                          <div className="d-flex  justify-content-between" style={{marginTop:'-120px'}}>
                                             <div style={{borderBottom:"1px solid black", marginBottom:"5px", padding:"3px"}} >
                                                <h5>Name: {review.username}</h5>
                                                <p> Date: {new Date(review.createdAt).toLocaleDateString('en-US', options)}</p>
                                             </div>

                                             <span className='d-flex align-items-center'>
                                                {review.rating}<i className='ri-star-s-fill'></i>
                                             </span>
                                       {/* <img src={review.photo} alt="" /> */}
                                          </div>

                                          <h6>{review.reviewText}</h6>
                                       </div>
                                    </div>
                                 ))
                              }
                           </ListGroup>
                        </div>
                        {/* ============ TOUR REVIEWS SECTION END ============== */}
                     </div>
                  </Col>

                  <Col lg='4'>
                     <Booking tour={tour} avgRating={avgRating} />
                  </Col>
               </Row>
            }
         </Container>
         <Newsletter />
      </section>
      </>

   )
}

export default TourDetails