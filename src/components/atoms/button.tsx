import React from "react";

export const styles = {
  bg: "bg-gray-600 hover:bg-gray-700",
};

const Button: React.FC<
  React.HTMLProps<HTMLButtonElement> & {
    bg: string;
  }
> = ({ bg = styles.bg, type = "button", className, ...rest }) => (
  <button
    type={type as "button"}
    className={`py-2 px-4 flex justify-center items-center focus:ring-gray-500 focus:ring-offset-gray-200 text-white transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 ${bg} rounded-lg ${
      className || ""
    }`}
    {...rest}
  />
);

export default Button;
