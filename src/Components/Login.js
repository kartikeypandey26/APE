import React, { useState, useEffect } from "react";
import { Link, Redirect } from "react-router-dom";
import img2 from "../images/3.png";
import axios from "axios";

const StudentLogin = () => {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [currentUser, setCurrentUser] = useState("");
  const [stuList, setStuList] = useState([]);

  useEffect(() => {
    var user = localStorage.getItem("currentUser");
    setCurrentUser(user);

    getAllStudents();
  }, []);

  const handleStudentLogin = () => {
    var userData = {
      email: email,
      password: pass,
    };
    console.log("myuserdata", userData);
    axios
      .post(
        "https://calm-scrubland-49069.herokuapp.com/student/login",
        userData
      )
      .then(
        (response) => {
          localStorage.setItem("currentUser", response.data.email);
          localStorage.setItem("currentUserType", response.data.userType);
          localStorage.setItem("desiredStudentEmail", "");
          console.log(response);
          setCurrentUser(response.data);
        },
        (error) => {
          console.error(error);
        }
      );
  };

  const handleTeacherLogin = () => {
    var userData = {
      email: email,
      password: pass,
    };
    console.log("myuserdata", userData);
    axios
      .post(
        "https://calm-scrubland-49069.herokuapp.com/teacher/login",
        userData
      )
      .then(
        (response) => {
          localStorage.setItem("currentUser", response.data.email);
          localStorage.setItem("currentUserType", response.data.userType);
          localStorage.setItem("desiredStudentEmail", "");
          console.log(response);
          setCurrentUser(response.data);
        },
        (error) => {
          console.error(error);
        }
      );
  };

  const handleLogOut = () => {
    localStorage.setItem("currentUser", null);
    setCurrentUser(null);
  };

  const getAllTeachers = () => {
    axios.get("https://calm-scrubland-49069.herokuapp.com/getTeachers").then(
      (response) => {
        console.log("success");
        console.log(response);
      },
      (error) => {
        console.log(error);
        console.log("failed");
      }
    );
  };

  const getAllStudents = () => {
    axios.get("https://calm-scrubland-49069.herokuapp.com/getStudents").then(
      (response) => {
        console.log("success");
        console.log(response);
        let stuNames = response.data.map((stu) => {
          let name = {
            name: stu.firstname + " " + stu.lastname,
            email: stu.email,
          };
          return name;
        });
        setStuList(stuNames);
      },
      (error) => {
        console.log(error);
        console.log("failed");
      }
    );
  };

  const StudentsList = () => {
    return (
      <div>
        <Link to="/TeacherRegister">
          <input
            className="btn btn-danger"
            type="button"
            value="Logout"
            onClick={() => {
              localStorage.setItem("currentUser", "");
              localStorage.setItem("currentUserType", "");
              localStorage.setItem("desiredStudentEmail", "");
            }}
            style={{ borderRadius: "25px", padding: "8px 50px" }}
          />
        </Link>
        <div>
          {stuList.length &&
            stuList.map((name) => {
              return (
                <Link to="/Charts">
                  <h3
                    onClick={() => {
                      localStorage.setItem("desiredStudentEmail", name.email);
                      console.log(name.email);
                    }}
                  >
                    {name.name}
                  </h3>
                </Link>
              );
            })}
        </div>
      </div>
    );
  };

  return (
    <div>
      {currentUser && currentUser.firstname ? (
        currentUser.userType == 0 ? (
          <div>
            <h1>{"Hi, " + currentUser.firstname}</h1>

            <input
              className="btn btn-success"
              type="button"
              style={{ borderRadius: "25px", padding: "8px 50px" }}
              value="Logout"
              onClick={handleLogOut}
            />

            <input
              className="btn btn-success"
              type="button"
              style={{ borderRadius: "25px", padding: "8px 50px" }}
              value="test"
              onClick={getAllTeachers}
            />
            <Redirect to="/Home"></Redirect>
          </div>
        ) : (
          <StudentsList />
        )
      ) : (
        <div
          className="container bg-dark"
          style={{ margin: "50px auto", borderRadius: "55px" }}
        >
          <h1 className="text-center" style={{ marginTop: "50px" }}>
            Login to APE
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
              <label>
                Email:
                <input
                  style={{
                    height: "30px",
                    borderRadius: "25px",
                    padding: "4px 8px",
                  }}
                  type="Email"
                  name="uname"
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                  value={email}
                />
              </label>
              <label>
                Password:
                <input
                  style={{
                    height: "30px",
                    borderRadius: "25px",
                    padding: "4px 8px",
                  }}
                  type="password"
                  name="upwd"
                  onChange={(e) => {
                    setPass(e.target.value);
                  }}
                  value={pass}
                />
              </label>

              <input
                className="btn btn-success"
                type="button"
                style={{ borderRadius: "25px", padding: "8px 50px" }}
                value="Login as Teacher"
                onClick={handleTeacherLogin}
              />

              <input
                className="btn btn-success"
                type="button"
                style={{ borderRadius: "25px", padding: "8px 50px" }}
                value="Login as Student"
                onClick={handleStudentLogin}
              />
              <p>
                Not an User? Register <Link to="/Landing">here</Link>
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentLogin;
