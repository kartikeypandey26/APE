import React, { useState } from "react";
import BarChart from "./Components/BarChart";
import FormComponent from "./Components/Form";

const Home = () => {
  const [chartObj, setChartObj] = useState({});
  const [stuDetails, setStuDetails] = useState({});
  return (
    <div className="container">
      <h1 className="my-3 text-center">Academic Performance Evaluation</h1>
      <div
        className="bg-dark p-2"
        style={{ margin: "50px auto", borderRadius: "55px" }}
      >
        <FormComponent
          setMyData={setChartObj}
          setStuDetails={setStuDetails}
          myData={chartObj}
          stuDetails={stuDetails}
        />
      </div>
      {/* <BarChart data={chartObj} /> */}
    </div>
  );
};

export default Home;
