import React from "react";
import { Chart } from "react-charts";

const MyChart =(props)=>{
  const chartData=[]
  for(let visit of props.data) {
    chartData.push([visit.date, visit.visit])
  }
  return(
      // A react-chart hyper-responsively and continuusly fills the available
      // space of its parent element automatically
      <div
        style={{
          width: "90%",
          height: "500px"
        }}
      >
        <Chart
          data={[
            {
              label: "Series 1",
              data: chartData
            },

          ]}
          axes={[
            { primary: true, type: "ordinal", position: "bottom" },
            { type: "linear", position: "left" }
          ]}
        />
      </div>
    )
}

export default MyChart;