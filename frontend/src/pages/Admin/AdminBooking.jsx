import React from "react";
import Header from "./Header/Header";
import useFetch from "../../hooks/useFetch";
import { BASE_URL } from "../../utils/config";
import { Container, Row, Col } from "reactstrap"; // Import Container, Row, and Col from reactstrap
import BookingCard from "../../shared/BookingCard";

function AdminBooking() {
  const {
    data: bookings,
    loading,
    error,
  } = useFetch(`${BASE_URL}/tours/admin/getallbookings`);

  const styles = {
    container: {
      maxWidth: "1200px",
      margin: "0 auto",
      padding: "20px",
    },
    loadingText: {
      fontSize: "18px",
      fontWeight: "bold",
    },
    errorText: {
      fontSize: "18px",
      fontWeight: "bold",
      color: "red",
    },
  };

  return (
    <div style={styles.container}>
      <Header />
      <div>
        {loading && <h4 style={styles.loadingText}>Loading.....</h4>}
        {error && <h4 style={styles.errorText}>{error}</h4>}
        {!loading && !error && (
          <Container>
            <Row>
              {bookings?.map((tour, index) => (
                <Col lg="3" md="4" sm="6" className="mb-4" key={tour._id}>
                  <BookingCard tour={tour} />
                </Col>
              ))}
            </Row>
          </Container>
        )}
      </div>
    </div>
  );
}

export default AdminBooking;
