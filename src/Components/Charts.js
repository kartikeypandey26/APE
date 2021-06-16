import React, { useState, useEffect } from "react";
import axios from "axios";

import { Pie, Bar, Line, PolarArea } from "react-chartjs-2";

const indexOfMax = (arr) => {
  if (arr.length === 0) {
    return -1;
  }

  var max = arr[0];
  var maxIndex = 0;

  for (var i = 1; i < arr.length; i++) {
    if (arr[i] > max) {
      maxIndex = i;
      max = arr[i];
    }
  }

  return maxIndex;
};

const indexOfSmallest = (a) => {
  var lowest = 0;
  for (var i = 1; i < a.length; i++) {
    if (a[i] < a[lowest]) lowest = i;
  }
  return lowest;
};
const Charts = () => {
  const [stuChartData, setStuChartData] = useState({});

  let subNameArr = stuChartData && stuChartData.labels;
  let subMarArr =
    stuChartData && stuChartData.datasets && stuChartData.datasets[0].data;
  let iMax = subMarArr && subNameArr[indexOfMax(subMarArr)];
  let iMin = subMarArr && subNameArr[indexOfSmallest(subMarArr)];
  useEffect(() => {
    var currentUser = localStorage.getItem("currentUser");
    var userType = localStorage.getItem("currentUserType");
    var desiredEmail = localStorage.getItem("desiredStudentEmail");
    console.log("userType", userType);
    var email = { email: userType == 1 ? desiredEmail : currentUser };
    axios
      .post(
        "https://calm-scrubland-49069.herokuapp.com/student/getMarks",
        email
      )
      .then(
        (response) => {
          console.log("get marks data->");

          var stuDetails = response.data;

          var ChartsData = {
            labels: stuDetails.map((stud) => {
              return stud.name;
            }),
            datasets: [
              {
                label: "Marks of Each Subjects",
                data: stuDetails.map((stud) => {
                  return stud.marks;
                }),
                backgroundColor: [
                  "rgba(255, 99, 132, 1)",
                  "rgba(54, 162, 235, 1)",
                  "rgba(255, 206, 86, 1)",
                  "rgba(75, 192, 192, 1)",
                  "rgba(153, 102, 255, 1)",
                  "rgba(255, 159, 64, 1)",
                ],
                borderColor: [
                  "rgba(255, 99, 132, 1)",
                  "rgba(54, 162, 235, 1)",
                  "rgba(255, 206, 86, 1)",
                  "rgba(75, 192, 192, 1)",
                  "rgba(153, 102, 255, 1)",
                  "rgba(255, 159, 64, 1)",
                ],
                borderWidth: 1,
              },
            ],
          };
          setStuChartData(ChartsData);
          console.log(ChartsData);
        },
        (error) => {
          console.log(error);
          console.log("failed");
        }
      );
  }, []);

  return (
    <div className="container">
      <h2>Charts</h2>
      <div
        className="bg-dark my-1"
        style={{ padding: "25px", borderRadius: "15px" }}
      >
        <h2>
          Strongest Area: <span className="Strong-sub">{iMax}</span>
        </h2>
        <h2>
          Weakest Area: <span className="weak-sub">{iMin}</span>
        </h2>
      </div>

      <div
        className="bg-light my-3"
        style={{ padding: "50px", borderRadius: "25px" }}
      >
        <Pie
          data={stuChartData ? stuChartData : []}
          width={400}
          height={500}
          options={{ maintainAspectRatio: false }}
        />
      </div>
      <div
        className="bg-light my-3"
        style={{ padding: "50px", borderRadius: "25px" }}
      >
        <Bar
          data={stuChartData ? stuChartData : []}
          width={400}
          height={500}
          options={{ maintainAspectRatio: false }}
        />
      </div>
      <div
        className="bg-light my-3"
        style={{ padding: "50px", borderRadius: "25px" }}
      >
        <Line
          data={stuChartData ? stuChartData : []}
          width={400}
          height={500}
          options={{ maintainAspectRatio: false }}
        />
      </div>
      <div
        className="bg-light my-3"
        style={{ padding: "50px", borderRadius: "25px" }}
      >
        <PolarArea
          data={stuChartData ? stuChartData : []}
          width={400}
          height={500}
          options={{ maintainAspectRatio: false }}
        />
      </div>
    </div>
  );
};

export default Charts;
