import React from "react";
import Header from "./Header/Header";
import useFetch from "../../hooks/useFetch";
import { BASE_URL } from "../../utils/config";
import {Row, Col, Container,} from "reactstrap";
import Subtitle from "../../shared/subtitle";
import TourCardAdmin from "../../shared/TourCardAdmin";
// import TourCard from "../../shared/TourCard";
function AdminPackages() {
  const {
    data: tours,
    loading,
    error,
  } = useFetch(`${BASE_URL}/tours/admin/getalltourss`);

  console.log("plx")
  console.log(tours);
  console.log("plx")

  const bookStyle = {
    display: "flex",
    flexWrap:"auto",
    gap:"10px"
  };



  return (
   <div>
    <Header />

    <div style={bookStyle}>
      <section>
         <Container>
            <Row>
               <Col lg='12' className='mb-5'>
                  {/* <Subtitle subtitle={'Explore'} /> */}
                  <h2 className='featured__tour-title'>Edit AdminPackages</h2>
               </Col>

                <>
         { loading && <h4>Loading.....</h4> }
         { error && <h4>{error}</h4> }
         {
            !loading && !error &&
            tours?.map(tour => (
               <Col lg='3' md='4' sm='6' className='mb-4' key={tour._id}>
                  <TourCardAdmin tour={tour} />
               </Col>
            ))
         }
      </>
            </Row>
         </Container>
      </section>
    </div>
    </div>
  );
}

export default AdminPackages;
