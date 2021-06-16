import React, { useState } from "react";
import { Link } from "react-router-dom";
import img1 from "../images/2.png";
import axios from "axios";

const Reg = () => {
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [section, setSection] = useState("");
  const [semester, setSemester] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  const [rollNo, setRollNo] = useState("");

  const handleRegister = () => {
    var userData = {
      firstname: fname,
      lastname: lname,
      email: email,
      password: pass,
      rollno: parseInt(rollNo),
      semester: parseInt(semester),
      section: section,
      phoneno: parseInt(phoneNo),
      subjects: [],
    };
    console.log("myuserdata", userData);
    axios
      .post(
        "https://calm-scrubland-49069.herokuapp.com/student/signup",
        userData
      )
      .then(
        (response) => {
          console.log("success");
          console.log(response);
        },
        (error) => {
          console.log(error);
        }
      );
  };

  return (
    <div
      className="container bg-dark"
      style={{ margin: "50px auto", borderRadius: "55px" }}
    >
      <h1 className="text-center text-light" style={{ margin: "30px auto" }}>
        {" "}
        Register on APE{" "}
      </h1>
      <div className="grid-2">
        <div className="center " style={{ margin: "100px auto" }}>
          <img src={img1} className="img-fluid" style={{ width: "300px" }} />
        </div>
        <div>
          <label>
            First Name:
            <input
              type="text"
              style={{
                height: "30px",
                borderRadius: "25px",
                padding: "4px 8px",
              }}
              name="fname"
              onChange={(e) => {
                setFname(e.target.value);
              }}
              value={fname}
            />
          </label>
          <label>
            Last Name:
            <input
              type="text"
              style={{
                height: "30px",
                borderRadius: "25px",
                padding: "4px 8px",
              }}
              name="lname"
              onChange={(e) => {
                setLname(e.target.value);
              }}
              value={lname}
            />
          </label>
          <label>
            E-mail:
            <input
              type="email"
              style={{
                height: "30px",
                borderRadius: "25px",
                padding: "4px 8px",
              }}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              value={email}
              name="uemail"
            />
          </label>
          <label>
            Password:
            <input
              type="password"
              style={{
                height: "30px",
                borderRadius: "25px",
                padding: "4px 8px",
              }}
              onChange={(e) => {
                setPass(e.target.value);
              }}
              value={pass}
              name="upwd"
            />
          </label>
          <label>
            Roll No:
            <input
              type="text"
              style={{
                height: "30px",
                borderRadius: "25px",
                padding: "4px 8px",
              }}
              onChange={(e) => {
                setRollNo(e.target.value);
              }}
              value={rollNo}
              name="cupwd"
            />
          </label>
          <label>
            Semester:
            <input
              type="text"
              style={{
                height: "30px",
                borderRadius: "25px",
                padding: "4px 8px",
              }}
              onChange={(e) => {
                setSemester(e.target.value);
              }}
              value={semester}
              name="sem"
            />
          </label>
          <label>
            Section:
            <input
              type="text"
              style={{
                height: "30px",
                borderRadius: "25px",
                padding: "4px 8px",
              }}
              onChange={(e) => {
                setSection(e.target.value);
              }}
              value={section}
              name="sec"
            />
          </label>
          <label>
            Phone No:
            <input
              type="text"
              style={{
                height: "30px",
                borderRadius: "25px",
                padding: "4px 8px",
              }}
              onChange={(e) => {
                setPhoneNo(e.target.value);
              }}
              value={phoneNo}
              name="phno"
            />
          </label>
          <Link to="/Login">
            <input
              className="btn btn-success"
              type="button"
              value="Register"
              style={{ borderRadius: "25px", padding: "8px 50px" }}
              onClick={handleRegister}
            />
          </Link>
          <Link to="/Login">
            <input
              className="btn btn-success"
              type="button"
              value="Login"
              style={{ borderRadius: "25px", padding: "8px 50px" }}
            />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Reg;
