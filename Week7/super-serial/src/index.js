import React from "react";
import ReactDOM from "react-dom";
import { ReactP5Wrapper } from "react-p5-wrapper";

// example of a simple sketch inline:
// const sketch = (p) => {
//   p.setup = function () {
//     p.createCanvas(400, 200);
//     p.background(200);
//   };

//   p.draw = function () {
//     p.fill(255, 0, 0);
//     p.ellipse(50, 50, 50, 50);
//   };
// };
// but we will import from sketches
import sketch from "./sketches/sketch.js";

const socket = new WebSocket("ws://localhost:3000");

socket.onmessage = (event) => {
  // Here, event.data will have the data sent from the server.
  // Update your state or p5.js sketch with the received data.
  const ascii = event.data;
  // Update your component or p5.js visualization.
};

function App() {
  return (
    <div className="App">
      <h1>React and p5.js Integration</h1>
      <ReactP5Wrapper sketch={sketch} />
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));
