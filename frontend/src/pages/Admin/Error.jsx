import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "reactstrap";




function Error(){

  const navigate = useNavigate()

    // function handleClick(){
    //     navigate('/admin/login')
    // }   
    return <>
        <p> YOu are not authorized</p>
        {/* <Button onClick={handleClick}> Click here to go back to admin login page</Button> */}

    </>
}

export default Error;