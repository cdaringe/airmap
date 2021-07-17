import React from "react";
import clsx from "clsx";

const Input: React.FC<React.HTMLProps<HTMLInputElement> & { error?: boolean }> =
  ({ error, className, ...rest }) => (
    <input
      className={clsx(
        `rounded-lg border-transparent flex-1 appearance-none border border-gray-300 py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent`,
        error ? "border-red-600" : undefined,
        className
      )}
      {...rest}
    />
  );

export default Input;
