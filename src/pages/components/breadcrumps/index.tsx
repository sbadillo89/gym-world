import Breadcrumbs from "react-router-dynamic-breadcrumbs";
import { BrowserRouter as Router } from "react-router-dom";
import React, { ReactNode } from "react";

const routesList = {
  "/": "Home",
  "/dashboard": "Dashboard",
  "/company": "Configuration",
  "/memberships": "Memberships",
  "/customers": "Customers",
};
const AppBreadCrumps = (): React.ReactElement => {
  return (
    <Router>
      <Breadcrumbs
        mappedRoutes={routesList}
        WrapperComponent={(children: ReactNode) => (
          <ol className="bg-indigo-200 w-96" id="breadcrumps">
            {children}
          </ol>
        )}
        ActiveLinkComponent={(children: ReactNode) => (
          <li className="breadcrumb-item active">{children}</li>
        )}
        LinkComponent={(children: ReactNode) => (
          <li className="breadcrumb-item">{children}</li>
        )}
      />
    </Router>
  );
};

export { AppBreadCrumps };
