import React from "react";
// import { MiniDrawer } from "../components/index";

function PostLoginLayout(props) {
  const { children } = props;

  return (
    <div>
      {children}
      {/* <MiniDrawer>{children}</MiniDrawer> */}
      {/* <main className="main_container d-flex flex-column">{children}</main> */}
    </div>
  );
}

export default PostLoginLayout;
