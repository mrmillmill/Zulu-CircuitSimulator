import React from 'react';

const ComponentLibrary = () => {
  const components = [
    { name: 'Battery', symbol: '🔋' },
    { name: 'Resistor', symbol: '🔲' },
  ];

  return (
    <div style={{ border: '1px solid gray', padding: '10px', width: '150px' }}>
      <h3>Component Library</h3>
      <ul>
        {components.map((component, index) => (
          <li key={index} style={{ margin: '10px 0', cursor: 'pointer' }}>
            <span>{component.symbol}</span> {component.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ComponentLibrary;
