import React from "react";
import { Pie, Bar, Line, PolarArea } from "react-chartjs-2";

// const data = {
//   labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
//   datasets: [
//     {
//       label: "# of Votes",
//       data: [12, 19, 3, 5, 2, 3],
//       backgroundColor: [
//         "rgba(255, 99, 132, 0.2)",
//         "rgba(54, 162, 235, 0.2)",
//         "rgba(255, 206, 86, 0.2)",
//         "rgba(75, 192, 192, 0.2)",
//         "rgba(153, 102, 255, 0.2)",
//         "rgba(255, 159, 64, 0.2)",
//       ],
//       borderColor: [
//         "rgba(255, 99, 132, 1)",
//         "rgba(54, 162, 235, 1)",
//         "rgba(255, 206, 86, 1)",
//         "rgba(75, 192, 192, 1)",
//         "rgba(153, 102, 255, 1)",
//         "rgba(255, 159, 64, 1)",
//       ],
//       borderWidth: 1,
//     },
//   ],
// };
const indexOfMax = arr => {
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

const indexOfSmallest = a => {
  var lowest = 0;
  for (var i = 1; i < a.length; i++) {
    if (a[i] < a[lowest]) lowest = i;
  }
  return lowest;
};
const BarChart = ({ data }) => {
  let subNameArr = data && data.labels;
  let subMarArr = data && data.datasets && data.datasets[0].data;
  let iMax = subMarArr && subNameArr[indexOfMax(subMarArr)];
  let iMin = subMarArr && subNameArr[indexOfSmallest(subMarArr)];
  console.log("subMarArr", data);
  return (
    <div>
      {data.labels && data.labels.length ? (
        <div>
          <h1 className="text-center my-2">Pie Chart</h1>
          <div
            className="bg-light"
            style={{ padding: "50px", borderRadius: "25px" }}
          >
            <Pie
              data={data ? data : []}
              style={{ color: "white" }}
              width={400}
              height={500}
              options={{ maintainAspectRatio: false }}
            />
          </div>
          <h1 className="text-center my-2">Bar Chart</h1>
          <div
            className="bg-light"
            style={{ padding: "50px", borderRadius: "25px" }}
          >
            <Bar
              data={data ? data : []}
              width={400}
              height={500}
              options={{ maintainAspectRatio: false }}
            />
          </div>
          <h1 className="text-center my-2">Line Chart</h1>
          <div
            className="bg-light"
            style={{ padding: "50px", borderRadius: "25px" }}
          >
            <Line
              data={data ? data : []}
              width={400}
              height={500}
              options={{ maintainAspectRatio: false }}
            />
          </div>
          <h1 className="text-center my-2">Radar Chart</h1>
          <div
            className="bg-light"
            style={{ padding: "50px", borderRadius: "25px" }}
          >
            <PolarArea
              data={data ? data : []}
              style={{ color: "white" }}
              width={400}
              height={500}
              options={{ maintainAspectRatio: false }}
            />
          </div>
          <div className="my-2 bg-dark p-2" style={{ borderRadius: "25px" }}>
            <h3>{`Strongest Area - ${iMax}`}</h3>
            <h3>{`Weakest Area - ${iMin}`}</h3>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default BarChart;
