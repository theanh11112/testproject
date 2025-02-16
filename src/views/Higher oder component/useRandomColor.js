import { useState, useEffect } from "react";

const getRandomColor = () => {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

const useRandomColor = () => {
  const [color, setColor] = useState(getRandomColor());

  useEffect(() => {
    const interval = setInterval(() => {
      setColor(getRandomColor());
    }, 1000); // Thay đổi màu mỗi 1 giây

    return () => clearInterval(interval); // Dọn dẹp khi component bị unmount
  }, []);

  return color;
};

export default useRandomColor;
