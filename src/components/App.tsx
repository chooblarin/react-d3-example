import React from "react";

import BarChart from "./BarChart";
import DonutChart from "./DonutChart";

const donutInputData = [
  { gender: "male", ratio: 0.2 },
  { gender: "female", ratio: 0.8 }
];

const barInputData = [
  { letter: "h", frequency: 50 },
  { letter: "u", frequency: 30 },
  { letter: "l", frequency: 15 },
  { letter: "k", frequency: 5 }
];

class App extends React.Component<{}, {}> {
  render() {
    return (
      <div>
        <h1>Hello App</h1>
        <BarChart
          inputData={barInputData}
          getX={item => item.letter}
          getY={item => item.frequency}
        />
        <DonutChart
          inputData={donutInputData}
          getX={item => item.gender}
          getY={item => item.ratio}
        />
        <style jsx global>{`
          html,
          body {
            margin: 0;
            padding: 0;
          }
          body {
            font-family: system-ui;
          }
        `}</style>
      </div>
    );
  }
}

export default App;
