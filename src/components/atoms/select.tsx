import React from "react";

const Select: React.FC<React.HTMLProps<HTMLSelectElement>> = ({
  className,
  ...rest
}) => (
  <select
    className={`block text-gray-700 py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 ${
      className || ""
    }`}
    {...rest}
  />
);

export default Select;
