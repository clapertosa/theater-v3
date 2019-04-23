import React from "react";

export default React.createContext({
  showSideDrawer: false,
  toggleSideDrawer: () => {},
  closeSideDrawer: () => {}
});
