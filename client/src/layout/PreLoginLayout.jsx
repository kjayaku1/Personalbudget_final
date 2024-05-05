import React from "react";

function PreLoginLayout(props) {
  const { children } = props;
  return (
    <main>{children}</main>
    // <main className="d-flex flex-column align-items-center justify-content-between flex-grow-1">
    //   {children}
    // </main>
  );
}

export default PreLoginLayout;
