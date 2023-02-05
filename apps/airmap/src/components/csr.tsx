import React from "react";

export const CSR: React.FunctionComponent<any> = ({ children }) => {
  const [isShowing, setShow] = React.useState(false);
  React.useEffect(() => setShow(true), []);
  return isShowing ? children : null;
};
