import React, { useState } from "react";
import { Container, Row, Col, Form, FormGroup, Button } from "reactstrap";

import "../../styles/login.css";
import { Link, useNavigate } from 'react-router-dom'
import registerImg from "../../assets/images/login.png";
import userIcon from "../../assets/images/user.png";
import { BASE_URL } from '../../utils/config'

const AdminLogin = () => {
  const [credentials, setCredentials] = useState({
    userName: undefined,
    password: undefined,
  });

  const navigate = useNavigate()

  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${BASE_URL}/auth/admin/login`, {
         method:'post',
         headers: {
            'content-type':'application/json'
         },
         credentials:'include',
         body: JSON.stringify(credentials)
      })

      const result = await res.json()
      if(res.status===201){
        localStorage.setItem('token', result.token);
        localStorage.setItem('adminToken', "secretkey123");
        console.log(localStorage.getItem('token'));
        navigate('/admin/home');
      }else if(res.status===200){
        alert("Invalid credentials")
      }else{
        alert('Something went wrong');
      }
    } catch(err) {
      alert('Something went wrong');
      
   }

   
  };

  return (
    <section>
      <Container>
        <Row>
          <Col lg="8" className="m-auto">
            <div className="login__container d-flex justify-content-between">
              <div className="login__img">
                <img src={registerImg} alt="" />
              </div>

              <div className="login__form">
                <div className="user">
                  <img src={userIcon} alt="" />
                </div>
                <h2>Admin- Login</h2>

                <Form onSubmit={handleClick}>
                  <FormGroup>
                    <input
                      type="text"
                      placeholder="Username"
                      id="username"
                      onChange={handleChange}
                      required
                    />
                  </FormGroup>
                  <FormGroup>
                    <input
                      type="password"
                      placeholder="Password"
                      id="password"
                      onChange={handleChange}
                      required
                    />
                  </FormGroup>
                  <Button
                    className="btn secondary__btn auth__btn"
                    type="submit"
                    onClick={handleClick}
                  >
                    {" "}
                    Loggin{" "}
                  </Button>
                </Form>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default AdminLogin;
