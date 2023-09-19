import React, { useState } from 'react';
import './App.css';

function App() {
  const initialMatrix = Array(3).fill(null).map(() => Array(3).fill(null));
  const [matrix, setMatrix] = useState(initialMatrix);
  const [clickOrder, setClickOrder] = useState([]);

  const handleBoxClick = (i, j) => {
    if (matrix[i][j]) return; // If the box is already clicked, return

    const newMatrix = matrix.map(row => row.slice());
    newMatrix[i][j] = 'green';
    setMatrix(newMatrix);

    const newClickOrder = [...clickOrder, { i, j }];
    setClickOrder(newClickOrder);

    if (newClickOrder.length === 9) {
      let counter = 0;
      const interval = setInterval(() => {
        if (counter >= newClickOrder.length) {
          clearInterval(interval);
          return;
        }
        const { i, j } = newClickOrder[counter];
        setMatrix(prevMatrix => {
          const updatedMatrix = prevMatrix.map(row => row.slice());
          if (!updatedMatrix[i][j] || updatedMatrix[i][j] === 'green') {
            updatedMatrix[i][j] = 'orange';
          }
          return updatedMatrix;
        });
        counter++;
      }, 500);
    }
};


return (
  <div className="app-container">
    <h1 className="title">React Matrix App</h1>
    <div className="matrix">
      {matrix.map((row, i) => (
        <div key={i} className="row">
          {row.map((color, j) => (
            <div
              key={j}
              className="box"
              style={{ backgroundColor: color }}
              onClick={() => handleBoxClick(i, j)}
            ></div>
          ))}
        </div>
      ))}
    </div>
  </div>
);

}

export default App;
