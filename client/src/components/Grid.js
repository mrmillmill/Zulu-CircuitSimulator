import React, { useState, useRef } from 'react';
import { useDrop } from 'react-dnd';

const Grid = () => {
  // State to track dropped components in each cell
  const [cells, setCells] = useState(Array(25).fill(null));

  const gridRef = useRef(null);

  // Define the drop behavior
  const [{ isOver }, drop] = useDrop(() => ({
    accept: ['battery', 'resistor'],
    drop: (item, monitor) => {
      const clientOffset = monitor.getClientOffset();

      if (clientOffset) {
        // Calculate which cell was dropped on
        const cellIndex = calculateCellIndex(clientOffset, gridRef);
        if (cellIndex >= 0) updateCell(cellIndex, item.name);
      }
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  // Calculate which cell to drop the item into based on client coordinates
  const calculateCellIndex = (clientOffset, gridRef) => {
    if (!gridRef.current) return 0;
  
    // Get the bounding rectangle of the grid
    const gridRect = gridRef.current.getBoundingClientRect();
  
    // Calculate the position relative to the grid
    const x = Math.floor((clientOffset.x - gridRect.left) / 100);
    const y = Math.floor((clientOffset.y - gridRect.top) / 100);
  
    // Ensure the calculated position is within grid boundaries
    if (x < 0 || x >= 5 || y < 0 || y >= 5) return -1;
  
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
    <div ref={drop(gridRef)} style={gridStyle}>
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
