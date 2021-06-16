import React, { useState } from "react";
import { Link } from "react-router-dom";
import img2 from "../images/2.png";

const Landing = () => {
  const [userType, setUserType] = useState(0);

  const setuser = (type) => {
    console.log(type);
    setUserType(type);
  };

  return (
    <div
      className="container bg-dark"
      style={{ margin: "50px auto", borderRadius: "55px" }}
    >
      <h1 className="text-center text-light" style={{ margin: "30px auto" }}>
        Register As
      </h1>
      <div className="grid-2" style={{ padding: "100px 0px" }}>
        <div className="center ">
          <img
            src={img2}
            className="img-fluid"
            style={{ width: "250px", margin: "0px 10px" }}
          />
        </div>
        <div>
          <Link to="StudentRegister">
            <input
              className="btn btn-success"
              type="button"
              style={{ borderRadius: "25px", padding: "8px 50px" }}
              value="Student"
              onClick={() => {
                setuser(0);
              }}
            />
          </Link>

          <Link to="TeacherRegister">
            <input
              className="btn btn-success"
              type="button"
              style={{ borderRadius: "25px", padding: "8px 50px" }}
              value="Teacher"
              onClick={() => {
                setuser(0);
              }}
            />
          </Link>

          <p>
            Already Registered? Login{" "}
            <Link to="/Login">
              <span>Here</span>
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Landing;
