import React from "react";

const Input: React.FC<React.HTMLProps<HTMLInputElement>> = ({
  className,
  ...rest
}) => (
  <input
    className={`rounded-lg border-transparent flex-1 appearance-none border border-gray-300 py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent ${
      className || ""
    }`}
    {...rest}
  />
);

export default Input;
