import { FullPageLoader } from "@components/full-page-loader";
import { BrowserRouter as Router } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { useAuth } from "@context/auth-context";
// eslint-disable-next-line import/no-namespace -- This is to avoid auth-provider methods collapsing with auth-context methods
import * as authProvider from "@utils/auth-provider";
import { Suspense, lazy } from "react";

const AuthenticatedApp = lazy(
  () =>
    import(
      /* webpackChunkName: "authenticated-app" */
      /* webpackPrefetch: true */
      "./authenticated-app"
    )
);
const UnauthenticatedApp = lazy(
  () =>
    import(
      /* webpackChunkName: "unauthenticated-app" */ "./unauthenticated-app"
    )
);

export const App = (): React.ReactElement => {
  const { user } = useAuth();
  const auth = authProvider.getAuthFromCache();

  return (
    <Router>
      <Suspense fallback={<FullPageLoader />}>
        {auth?.token && user ? (
          <AuthenticatedApp token={auth.token} user={user} />
        ) : (
          <UnauthenticatedApp />
        )}
      </Suspense>
      <Toaster
        position="bottom-center"
        reverseOrder
        toastOptions={{
          className: "text-base max-w-2xl",
          duration: 5000,
        }}
      />
    </Router>
  );
};
