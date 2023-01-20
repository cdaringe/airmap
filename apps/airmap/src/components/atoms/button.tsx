import clsx from "clsx";
import React from "react";

export const styles = {
  bg: "bg-gray-600 hover:bg-gray-700 focus:ring-gray-500 focus:ring-offset-gray-200",
  display: "flex",
};

const Button: React.FC<
  React.HTMLProps<HTMLButtonElement> & {
    styles?: {
      bg?: string;
      display?: string;
    };
  }
> = ({
  styles: { bg = styles.bg, display = styles.display } = {},
  type = "button",
  className,
  ...rest
}) => {
  const clsStr = clsx(
    className,
    bg,
    display,
    `py-2 px-4 justify-center items-center text-white transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg`,
    rest.disabled ? "bg-gray-400 hover:bg-gray-400 cursor-not-allowed" : ""
  );
  return <button type={type as "button"} className={clsStr} {...rest} />;
};

export default Button;
