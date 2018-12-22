import React from "react";
import ExampleBarChart from "./ExampleBarChart";
import ExampleLineChart from "./ExampleLineChart";
import ExampleDounutChart from "./ExambleDonutChart";

class App extends React.Component<{}, {}> {
  render() {
    return (
      <main>
        <h1>React + D3 Examples</h1>
        <ExampleBarChart />
        <ExampleLineChart />
        <ExampleDounutChart />
        <style jsx global>{`
          @import url("https://fonts.googleapis.com/css?family=Noto+Serif:400,700");
          html,
          body {
            margin: 0;
            padding: 0;
            color: #424211;
            background: #f8f8f4;
          }
          * {
            font-family: "Noto Serif", serif, system-ui;
          }
          main {
            display: flex;
            flex-direction: column;
            align-items: center;
            max-width: 960px;
            margin: 0 auto;
          }
          /* Typography */
          h1,
          h2,
          h3,
          h4 {
            margin: 3rem 0 1rem;
            font-weight: 300;
          }
          h1 {
            font-size: 2.6rem;
            line-height: 1.2;
            letter-spacing: -0.1rem;
            padding: 0 1rem;
          }
          h2 {
            font-size: 2.4rem;
            line-height: 1.25;
            letter-spacing: -0.1rem;
          }
          h3 {
            font-size: 1.8rem;
            line-height: 1.3;
          }
        `}</style>
      </main>
    );
  }
}

export default App;
