import React, { useState } from 'react';
import './App.css';

function App() {
  
  const [matrix, setMatrix] = useState([
    ['white', 'white', 'white'],
    ['white', 'white', 'white'],
    ['white', 'white', 'white']
    
  ]);
  const [clickOrder, setClickOrder] = useState([]);
  const handleBoxClick = (i, j) => {
    if (matrix[i][j] !== 'white') return; // box is already clicked, return

    // Update clicked box to green
    const newMatrix = matrix.map(row => [...row]);
    newMatrix[i][j] = 'green';
    setMatrix(newMatrix);

    // clickOrder array
    const newClickOrder = [...clickOrder, { i, j }];
    setClickOrder(newClickOrder);

    // If all boxes have been clicked
    if (newClickOrder.length === 9) {
      let counter = 0;
      const interval = setInterval(() => {
        if (counter >= newClickOrder.length) {
          clearInterval(interval);
          return;
        }
        const { i, j } = newClickOrder[counter];
        newMatrix[i][j] = 'orange';
        setMatrix([...newMatrix]);
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