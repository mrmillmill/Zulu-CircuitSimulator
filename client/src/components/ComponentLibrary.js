import React from 'react';
import { useDrag } from 'react-dnd';

const ComponentLibrary = () => {
  const components = [
    { name: 'Battery', symbol: '🔋', type: 'battery' },
    { name: 'Resistor', symbol: '🔲', type: 'resistor' },
  ];

  // DraggableComponent: Represents each item in the component library
  const DraggableComponent = ({ component }) => {
    const [{ isDragging }, drag] = useDrag(() => ({
      type: component.type,
      item: { name: component.name },
      collect: (monitor) => ({
        isDragging: !!monitor.isDragging(),
      }),
    }));

    return (
      <div
        ref={drag}
        style={{
          opacity: isDragging ? 0.5 : 1,
          cursor: 'grab',
          margin: '10px 0',
        }}
      >
        <span>{component.symbol}</span> {component.name}
      </div>
    );
  };

  return (
    <div style={{ border: '1px solid gray', padding: '10px', width: '150px' }}>
      <h3>Component Library</h3>
      <ul>
        {components.map((component, index) => (
          <DraggableComponent key={index} component={component} />
        ))}
      </ul>
    </div>
  );
};

export default ComponentLibrary;
