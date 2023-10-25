import React, { useState } from 'react';
import { BASE_URL } from '../../utils/config';
import Header from './Header/Header';
import { imageDB } from '../../utils/firebaseConfig';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { Button } from 'reactstrap';
import { v4 as uuid } from 'uuid';

function AdminAdd() {

  const [image, setImage] = useState(null);
  const [imgUrl, setImgUrl] = useState("");
  const [isUploading, setIsUploading] = useState(false);

  const [formData, setFormData] = useState({
    title: '',
    city: '',
    address: '',
    distance: 0,
    photo: null,
    desc: '',
    price: 0,
    maxGroupSize: 0,
  });

  const styles = {
    container: {
      maxWidth: '600px',
      margin: '0 auto',
      padding: '20px',
      border:"1px solid #eee"
    },
    label: {
      marginBottom: '5px',
      display: 'block',
    },
    input: {
      width: '100%',
      padding: '8px',
      marginBottom: '10px',
      borderRadius: '5px',
      border: '1px solid #ccc',
    },
    fileInput: {
      display: 'none',
    },
    button: {
      padding: '10px 15px',
      backgroundColor: imgUrl ? '#007bff' : '#ccc',
      width:"150px",
      color: '#fff',
      border: 'none',
      borderRadius: '5px',
      cursor: imgUrl ? 'pointer' : 'not-allowed',
      marginTop:"10px"
    },
    button2: {
      padding: '10px 15px',
      backgroundColor: '#007bff',
      color: '#fff',
      border: 'none',
      borderRadius: '5px',
      cursor: imgUrl ? 'pointer' : 'not-allowed',
    },
    uploadingText: {
      marginLeft: '10px',
      color: '#007bff',
    },
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleImageUpload = async () => {
    setIsUploading(true);
    const unique_id = uuid();
    const small_id = unique_id.slice(0, 8);
    const img = ref(imageDB, `files/img${small_id}`);
    try {
      const snapshot = await uploadBytes(img, image);
      const url = await getDownloadURL(snapshot.ref);
      setIsUploading(false);
      setImgUrl(url);
      setFormData({
        ...formData,
        photo: url,
      });
    } catch (error) {
      console.error('Error uploading image to Firebase:', error);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("tick")

    try {
      // Send a POST request to your backend API endpoint
      const res = await fetch(`${BASE_URL}/tours/admin/createTour`, {
        method: 'post',
        headers: {
          'content-type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify(formData)
      })

      const result = await res.json();
      if (res.status === 200) {
        window.alert("Saved successfully");
        setImgUrl(null);

      } else {
        window.alert("Something went wrong");
      }

      // Clear the form or perform other actions as needed
      setFormData({
        title: '',
        city: '',
        address: '',
        distance: 0,
        photo: '',
        desc: '',
        price: 0,
        maxGroupSize: 0,
      });
    } catch (error) {
      console.error('Error adding data to the database', error);
      // Handle the error, show an error message to the user, etc.
    }
  };

  return (
    <div>

      <Header />
    <div style={styles.container}>
      {/* <h1>Add a New Tour</h1> */}
      <form onSubmit={handleSubmit}>
        <div>
          <label style={styles.label}>Title:</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            style={styles.input}
          />
        </div>
        <div>
          <label style={styles.label}>City:</label>
          <input
            type="text"
            name="city"
            value={formData.city}
            onChange={handleInputChange}
            style={styles.input}
          />
        </div>
        <div>
          <label style={styles.label}>Address:</label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleInputChange}
            style={styles.input}
          />
        </div>
        <div>
          <label style={styles.label}>Distance:</label>
          <input
            type="number"
            name="distance"
            value={formData.distance}
            onChange={handleInputChange}
            style={styles.input}
          />
        </div>
        <div>
          <label style={styles.label}>Photo:</label>
          <input
            type="file"
            onChange={(e) => setImage(e.target.files[0])}
            // style={styles.fileInput}
          />
          {isUploading && <span style={styles.uploadingText}>Uploading...</span>}
          <Button onClick={handleImageUpload} style={styles.button2}>Upload Image</Button>
        </div>
        <div>
          <label style={styles.label}>Description:</label>
          <input
            type="text"
            name="desc"
            value={formData.desc}
            onChange={handleInputChange}
            style={styles.input}
          />
        </div>
        <div>
          <label style={styles.label}>Price:</label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleInputChange}
            style={styles.input}
          />
        </div>
        <div>
          <label style={styles.label}>Max Group Size:</label>
          <input
            type="number"
            name="maxGroupSize"
            value={formData.maxGroupSize}
            onChange={handleInputChange}
            style={styles.input}
          />
        </div>
        {imgUrl ? <button type="submit" onClick={handleSubmit} style={styles.button}>Add Tour</button> : <button type="submit" disabled="true" onClick={handleSubmit} style={styles.button}>Add Tour</button>}
      </form>
    </div>
    </div>

  );
}

export default AdminAdd;
