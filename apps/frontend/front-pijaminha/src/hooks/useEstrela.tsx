import { useState } from "react";

export const useEstrela = () => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);

  const handleClick = (value: number) => {
    setRating(value);
  };

  const handleMouseEnter = (value: number) => {
    setHover(value);
  };

  const handleMouseLeave = () => {
    setHover(0);
  };

  return {
    rating,
    hover,
    handleClick,
    handleMouseEnter,
    handleMouseLeave,
  };
};
