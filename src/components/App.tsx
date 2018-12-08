import React from "react";

import DonutChart from "./DonutChart";

const inputData: any[] = [
  { gender: "male", ratio: 0.2 },
  { gender: "female", ratio: 0.8 }
];
class App extends React.Component<{}, {}> {
  render() {
    return (
      <div>
        <h1>Hello App</h1>
        <DonutChart inputData={inputData} getValue={item => item.ratio} />
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
