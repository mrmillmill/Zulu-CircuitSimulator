import React, { useState, useRef } from 'react';
import { useDrop } from 'react-dnd';

const Grid = () => {
  const [cells, setCells] = useState(Array(25).fill(null));
  const [connections, setConnections] = useState([]); // State to track connections between cells
  const [selectedCell, setSelectedCell] = useState(null); // State to track the selected cell for connections
  const gridRef = useRef(null);

  const [{ isOver }, drop] = useDrop(() => ({
    accept: ['battery', 'resistor'],
    drop: (item, monitor) => {
      const clientOffset = monitor.getClientOffset();
      if (clientOffset) {
        const cellIndex = calculateCellIndex(clientOffset, gridRef);
        if (cellIndex >= 0) updateCell(cellIndex, item.type);
      }
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  // Existing functions such as calculateCellIndex, updateCell, handleCellClick, etc.
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

  const getComponentData = (type) => {
    switch (type) {
      case 'battery':
        return { name: 'Battery', icon: '🔋' };
      case 'resistor':
        return { name: 'Resistor', icon: '🔲' };
      default:
        return { name: 'Unknown', icon: '?' };
    }
  };
  
  
  const updateCell = (index, componentType) => {
    const componentData = getComponentData(componentType);
    setCells((prevCells) => {
      const newCells = [...prevCells];
      newCells[index] = componentData;
      return newCells;
    });
  };
  

  const handleCellClick = (index) => {
    if (selectedCell === null) {
      // If no cell is selected, set this as the starting cell
      setSelectedCell(index);
    } else {
      // If a cell is already selected, add the connection
      setConnections((prevConnections) => [
        ...prevConnections,
        [selectedCell, index],
      ]);
      setSelectedCell(null); // Reset the selection
    }
  };

  const renderConnections = () => {
    return connections.map(([start, end], index) => {
      const startX = (start % 5) * 100 + 50;
      const startY = Math.floor(start / 5) * 100 + 50;
      const endX = (end % 5) * 100 + 50;
      const endY = Math.floor(end / 5) * 100 + 50;

      const length = Math.sqrt((endX - startX) ** 2 + (endY - startY) ** 2);
      const angle = Math.atan2(endY - startY, endX - startX) * (180 / Math.PI);

      return (
        <div
          key={index}
          style={{
            position: 'absolute',
            top: startY,
            left: startX,
            width: length,
            height: '2px',
            backgroundColor: 'black',
            transform: `rotate(${angle}deg)`,
            transformOrigin: '0 0',
          }}
        />
      );
    });
  };

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
    <div ref={drop(gridRef)} style={{ position: 'relative', ...gridStyle }}>
      {renderConnections()}
      {cells.map((cell, index) => (
        <div
          key={index}
          onClick={() => handleCellClick(index)}
          style={{
            border: '1px dashed gray',
            width: '100px',
            height: '100px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '24px',
            backgroundColor: selectedCell === index ? '#d3f9d8' : 'white',
          }}
        >
          {cell ? cell.icon : ''}
        </div>
      ))}
    </div>
  );
};

export default Grid;
