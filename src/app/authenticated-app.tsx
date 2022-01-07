import { Company } from "../pages/company";
import { CustomerDetails } from "../pages/customer-details";
import { Customers } from "../pages/customers";
import { DashboardLayout } from "../pages/dashboard-layout";
import { FetchProvider } from "@context/fetch-context";
import { Home } from "../pages/home";
import { MembershipDetails } from "../pages/membership-details";
import { Memeberships } from "../pages/memberships";
import { ReactQueryDevtools } from "react-query/devtools";
import { UserAttr } from "@services/users";
import { QueryClient, QueryClientProvider } from "react-query";
import { Redirect, Route, Switch } from "react-router-dom";

const queryClient = new QueryClient({
  defaultOptions: { queries: { staleTime: Infinity } },
});

type AuthenticatedAppProps = {
  token: string;
  user: UserAttr;
};

const AuthenticatedApp = ({
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  token,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  user,
}: AuthenticatedAppProps): React.ReactElement => (
  <FetchProvider>
    <QueryClientProvider client={queryClient}>
      <DashboardLayout>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/company">
            <Company />
          </Route>
          <Route exact path="/customers/:id">
            <CustomerDetails />
          </Route>
          <Route exact path="/customers">
            <Customers />
          </Route>
          <Route exact path="/memberships/:id">
            <MembershipDetails />
          </Route>
          <Route exact path="/memberships">
            <Memeberships />
          </Route>
          <Redirect from="*" to="/" />
        </Switch>
        <ReactQueryDevtools />
      </DashboardLayout>
    </QueryClientProvider>
  </FetchProvider>
);

// Default export is necessary for code splitting with Webpack.
// eslint-disable-next-line import/no-default-export
export default AuthenticatedApp;
