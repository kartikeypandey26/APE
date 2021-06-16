import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import img from "../images/1.png";
import { Link } from "react-router-dom";

const FormComponent = ({ setMyData, myData, setStuDetails, stuDetails }) => {
  const [subArr, setSubArr] = useState([]);
  const [stuExamType, setExamType] = useState("");
  // const [chartObj, setChartObj] = useState({});
  // const [tempObj, setTempObj] = useState({});
  const abck = (num) => {
    let arr = [];
    for (let index = 0; index < num; index++) {
      arr.push(index + 1);
    }
    setSubArr(arr);
  };

  const handleSubjectDetails = (myobj) => {
    console.log("myuserdata", myobj);
    axios
      .post(
        "https://calm-scrubland-49069.herokuapp.com/student/subjectdetails",
        myobj
      )
      .then(
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

  const RenderSubjects = () => {
    return (
      <div>
        {subArr &&
          subArr.map((sub) => {
            return (
              <div key={sub}>
                <label key={`sub ${sub}`}>
                  {`Sub ${sub} Name:`}
                  <input
                    type="text"
                    name={`subname ${sub}`}
                    style={{
                      width: "100%",
                      height: "30px",
                      borderRadius: "25px",
                      padding: "4px 8px",
                    }}
                    id={`subname ${sub}`}
                  />
                </label>
                <label key={`mark ${sub}`}>
                  {`Sub ${sub} Marks:`}
                  <br />
                  <input
                    type="number"
                    style={{
                      width: "100%",
                      height: "30px",
                      borderRadius: "25px",
                      padding: "4px 8px",
                    }}
                    name={`submarks ${sub}`}
                    id={`submarks ${sub}`}
                  />
                </label>
              </div>
            );
          })}
      </div>
    );
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    var obj = {};
    var chartData = {};
    obj.subjects = [];
    // obj.stuName = document.getElementById("stuName").value;
    // obj.stuClg = document.getElementById("stuClg").value;
    // obj.stuSem = document.getElementById("stuSem").value;
    // obj.stuExm = document.getElementById("stuExm").value;

    subArr &&
      subArr.map((sub) => {
        let mySub = `subname ${sub}`;
        let subName = document.getElementById(mySub).value;
        let mySubMar = `submarks ${sub}`;
        let subMar = document.getElementById(mySubMar).value;

        let finalObj = {
          name: subName,
          marks: subMar,
          examType: stuExamType,
        };
        obj.subjects.push(finalObj);
        return 0;
      });
    obj.email = localStorage.getItem("currentUser");
    setStuDetails(obj);
    console.log(obj);
    chartData.labels = obj.subjects.map((nameobj) => {
      return nameobj.name;
    });
    chartData.datasets = [];
    let datasetObj = {};
    datasetObj.label = "Test";
    datasetObj.data = obj.subjects.map((nameobj) => {
      return nameobj.marks;
    });
    datasetObj.backgroundColor = [
      "rgba(255, 99, 132, 0.7)",
      "rgba(54, 162, 235, 0.7)",
      "rgba(255, 206, 86, 0.7)",
      "rgba(75, 192, 192, 0.7)",
      "rgba(153, 102, 255, 0.7)",
      "rgba(255, 159, 64, 0.7)",
    ];

    datasetObj.borderColor = [
      "rgba(255, 99, 132, 1)",
      "rgba(54, 162, 235, 1)",
      "rgba(255, 206, 86, 1)",
      "rgba(75, 192, 192, 1)",
      "rgba(153, 102, 255, 1)",
      "rgba(255, 159, 64, 1)",
    ];
    datasetObj.borderWidth = 1;
    chartData.datasets.push(datasetObj);
    setMyData(chartData);
    handleSubjectDetails(obj);
  };
  const notify = () => toast("Max Subject should be 6.");

  const onChangeExamType = (e) => {
    setExamType(e.target.value);
  };
  return (
    <div className="container">
      <ToastContainer />
      <div className="grid-2">
        <div className="center ">
          <img
            src={img}
            className="img-fluid"
            style={{ width: "250px", margin: "0px 10px" }}
          />
        </div>
        <form onSubmit={handleSubmit}>
          <label>
            <h2>Exam Type:</h2>
          </label>{" "}
          <div onChange={onChangeExamType}>
            <input
              type="radio"
              value="CT1"
              name="examtype"
              style={{ marginRight: "10px" }}
            />{" "}
            CT-01
            <input
              type="radio"
              value="CT2"
              name="examtype"
              style={{ margin: "0 10px" }}
            />{" "}
            CT-02
            <input
              type="radio"
              value="Sem"
              name="examtype"
              style={{ margin: "0 10px" }}
            />{" "}
            ESE
          </div>
          <label>
            No of Subjects:
            <br />
            <input
              type="number"
              name="subno"
              style={{
                width: "100%",
                height: "30px",
                borderRadius: "25px",
                padding: "4px 8px",
              }}
              required
              maxLength="6"
              onChange={(e) => {
                let num = e.target.value;
                console.log(num);
                if (num > 6 || num < 1) {
                  notify();
                } else {
                  abck(num);
                }
              }}
            />
          </label>
          {subArr.length ? <RenderSubjects /> : null}
          <br />{" "}
          <input
            style={{ borderRadius: "25px", padding: "8px 50px" }}
            className="btn btn-success"
            type="submit"
            value="Save Details"
          />
          <Link to="/Charts">
            <input
              className="btn btn-success"
              type="submit"
              value="Perfomance Evaluate"
              style={{ borderRadius: "25px", padding: "8px 50px" }}
            />
          </Link>
          <Link to="/Login">
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
        </form>
      </div>
    </div>
  );
};

export default FormComponent;
