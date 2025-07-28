import React from "react";
import AppName from "./AppName";

const AppNameTest: React.FC = () => {
  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>AppName Component Test</h1>
      
      <h2>Font Test:</h2>
      <p style={{ fontFamily: '"Euclid Circular B", sans-serif', fontWeight: 'bold', fontSize: '24px' }}>
        This should be in Euclid Circular B font: iSchedulEDU
      </p>
      <p style={{ fontFamily: 'Arial, sans-serif', fontWeight: 'bold', fontSize: '24px' }}>
        This should be in Arial font: iSchedulEDU
      </p>
      
      <h2>Default AppName:</h2>
      <p>Here is the <AppName /> component in a paragraph.</p>
      
      <h2>Different Sizes:</h2>
      <p>Small: <AppName size="sm" /></p>
      <p>Medium: <AppName size="md" /></p>
      <p>Large: <AppName size="lg" /></p>
      <p>Extra Large: <AppName size="xl" /></p>
      
      <h2>With Custom Classes:</h2>
      <p><AppName className="text-blue-600" /></p>
      <p><AppName className="text-red-600" /></p>
      
      <h2>In Headings:</h2>
      <h3>How <AppName /> Meets Elementary Needs</h3>
      <p><AppName /> is specifically designed for educational environments.</p>
      
      <h2>Debug Info:</h2>
      <p>If you can see the first line in a different font than the second line, the font is loading correctly.</p>
      <p>If both lines look the same, the Euclid Circular B font is not loading.</p>
    </div>
  );
};

export default AppNameTest; 