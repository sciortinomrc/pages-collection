import React from "react";
import { Chart } from "react-charts";

const Visits =(props)=>{
  const chartData=[]
  const step = Math.trunc(props.data.length/10);
  const last = props.data.length-1;
  let c = 0;
  for(let visit of props.data) {
    if(c%step!=0 && c!=last && last+1>10) {c++;continue;}
    c++;
    chartData.push([visit.date,visit.count])
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
              label: "Visits",
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

export default Visits;