import React from "react";
import useRandomColor from "./useRandomColor"; // Import custom hook

const Color = (WrappedComponent) => {
  // Component trung gian để gọi hook
  const ColoredComponent = (props) => {
    const color = useRandomColor(); // Gọi hook trong React Function Component
    return (
      <div style={{ color }}>
        <WrappedComponent {...props} />
      </div>
    );
  };

  return ColoredComponent; // Trả về Component
};

export default Color;
