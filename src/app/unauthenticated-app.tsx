import { AuthLayout } from "../pages/auth/components/auth-layout";
import { Login } from "../pages/auth/login";
import { Signup } from "../pages/auth/signup";
import { Redirect, Route, Switch } from "react-router-dom";

const UnauthenticatedApp = (): React.ReactElement => (
  <AuthLayout>
    <Switch>
      <Route path="/login">
        <Login />
      </Route>
      <Route path="/signup">
        <Signup />
      </Route>
      <Route path="/forgot-password">
        <p>Forgot Password</p>
      </Route>
      <Redirect from="*" to="/login" />
    </Switch>
  </AuthLayout>
);
// Default export is necessary for code splitting with Webpack.
// eslint-disable-next-line import/no-default-export
export default UnauthenticatedApp;
