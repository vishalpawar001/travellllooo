import React from "react";
import { Card, CardBody } from "reactstrap";
import { Link } from "react-router-dom";
import "./tour-card.css";
import calculateAvgRating from "../utils/avgRating";
import Header from "../pages/Admin/Header/Header";

const BookingCard = ({ tour }) => {
  const {
    _id,
    userId,
    userEmail,
    tourName,
    fullName,
    guestSize,
    phone,
    bookAt,
  } = tour;

  // const { totalRating, avgRating } = calculateAvgRating(reviews)

  const styles = {
    card: {
      // width:"200px",
      border: "1px solid #ccc",
      borderRadius: "10px",
      boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
      padding: "15px",
      marginBottom: "20px",
    },
    cardTitle: {
      fontSize: "18px",
      fontWeight: "bold",
    },
    cardText: {
      fontSize: "16px",
    },
    cardFooter: {
      fontSize: "14px",
      color: "#888",
    },
  };

  return (
    <Card style={styles.card}>
      <div className="tour__card shadow-0">
        <div class="card  ">
          <div class="card-body">
            <h5 class="card-title" style={styles.cardTitle}>
              {fullName}{" "}
            </h5>
            <p class="card-text" style={styles.cardText}>
              Tour: {tourName} <br />
              Email: {userEmail} <br />
              No: {guestSize} <br />
              Phone: {phone} <br />
            </p>
          </div>
          <div class="card-footer" style={styles.cardFooter}>
            Date: {bookAt}{" "}
          </div>
        </div>
      </div>
    </Card>
  );
};

export default BookingCard;
