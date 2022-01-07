import { Fragment } from "react";
//import { ItemNavbarProfile } from "../components/item-navbar-profile";

//import { NavLink } from "react-router-dom";
import { Navbar } from "./navbar";

type DashboardLayoutProps = {
  children: React.ReactNode;
};

const DashboardLayout = ({
  children,
}: DashboardLayoutProps): React.ReactElement => {
  return (
    <Fragment>
      <Navbar />
      <div className="mx-auto px-2 pt-2">{children}</div>
    </Fragment>
  );
};

export { DashboardLayout };
