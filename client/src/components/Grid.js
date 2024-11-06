import React, { useState } from 'react';
import { useDrop } from 'react-dnd';

const Grid = () => {
  // State to track dropped components in each cell
  const [cells, setCells] = useState(Array(25).fill(null));

  // Define the drop behavior
  const [{ isOver }, drop] = useDrop(() => ({
    accept: ['battery', 'resistor'],
    drop: (item, monitor) => {
      const clientOffset = monitor.getClientOffset();

      if (clientOffset) {
        // Calculate which cell was dropped on
        const cellIndex = calculateCellIndex(clientOffset);
        updateCell(cellIndex, item.name);
      }
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  // Calculate which cell to drop the item into based on client coordinates
  const calculateCellIndex = (clientOffset) => {
    const x = Math.floor(clientOffset.x / 100);
    const y = Math.floor(clientOffset.y / 100);
    return y * 5 + x;
  };

  // Update the cell with the dropped component name
  const updateCell = (index, componentName) => {
    setCells((prevCells) => {
      const newCells = [...prevCells];
      newCells[index] = componentName;
      return newCells;
    });
  };

  // Style for the grid
  const gridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(5, 100px)',
    gridTemplateRows: 'repeat(5, 100px)',
    gap: '5px',
    border: '2px solid black',
    padding: '10px',
    width: '550px',
    height: '550px',
    backgroundColor: isOver ? '#f0f8ff' : 'white',
  };

  return (
    <div ref={drop} style={gridStyle}>
      {cells.map((cell, index) => (
        <div
          key={index}
          style={{
            border: '1px dashed gray',
            width: '100px',
            height: '100px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {cell}
        </div>
      ))}
    </div>
  );
};

export default Grid;
