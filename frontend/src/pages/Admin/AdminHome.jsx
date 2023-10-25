import React from "react";
import Header from "./Header/Header";

function AdminHome() {
  const styles = {
    container: {
      backgroundColor: "#f2f2f2", // Change to your desired background color
      minHeight: "80vh", // 90% of the viewport height
      minWidth: "90vw", // 90% of the viewport width
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      padding: "20px",
    },
    content: {
      textAlign: "center",
    },
    warning: {
      fontSize: "18px",
      fontWeight: "bold",
      marginTop: "20px",
    },
  };

  return (
    <div>
      <Header />

    <div style={styles.container}>
      <div style={styles.content}>
        <h1>Hello, Admin!</h1>
        <p>This is Admin Panel</p>
        <div>
          <p style={styles.warning}>Warning!</p>
          <p>
            Admin has access to confidential and sensitive data, use the panel carefully!!
          </p>
        </div>
      </div>
    </div>
    </div>

  );
}

export default AdminHome;
