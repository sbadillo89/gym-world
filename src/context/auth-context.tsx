import { FullPageErrorFallback } from "@components/full-page-error-fallback";
import { FullPageLoader } from "@components/full-page-loader";
import { QueryClient } from "react-query";
import { UserAttr } from "@services/users";
import { publicRequest } from "@utils/public-request";
import { useAsync } from "@utils/hooks/use-async";
// eslint-disable-next-line import/no-namespace -- This is to avoid auth-provider methods collapsing with auth-context methods
import * as authProvider from "@utils/auth-provider";
import { createContext, useContext, useEffect } from "react";

const getUserData = async (
  accessToken: string,
  userID: string
): Promise<UserAttr> => {
  const response = await publicRequest.get<UserAttr>(`/api/User/${userID}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  return response.data;
};

const bootstrapAppData = async (): Promise<UserAttr | null> => {
  const auth = authProvider.getAuthFromCache();

  if (auth) {
    try {
      const user = await getUserData(auth.token, auth.userId);

      return user;
    } catch (error) {
      authProvider.removeAuthInCache();

      return null;
    }
  }

  return null;
};

type AuthContextState = {
  user: UserAttr | null | undefined;
  setData: (data: UserAttr | null | undefined) => void;
};

const AuthContext = createContext<AuthContextState | null>(null);
if (process.env.NODE_ENV === "development") {
  AuthContext.displayName = "AuthContext";
}

type AuthProviderProps = {
  children?: React.ReactNode;
};

const AuthProvider = ({ children }: AuthProviderProps): React.ReactElement => {
  const { run, setData, ...bootstrapAppDataQuery } = useAsync<
    UserAttr | null | undefined
  >();

  useEffect(() => {
    run(bootstrapAppData());
  }, [run]);

  if (bootstrapAppDataQuery.status === "resolved") {
    return (
      <AuthContext.Provider
        value={{ user: bootstrapAppDataQuery.data, setData }}
      >
        {children}
      </AuthContext.Provider>
    );
  }

  if (bootstrapAppDataQuery.status === "rejected") {
    return <FullPageErrorFallback error={bootstrapAppDataQuery.error} />;
  }

  return <FullPageLoader />;
};

const login = async (
  setData: (data: UserAttr | null) => void,
  credentials: Parameters<typeof authProvider.login>[0]
): Promise<void> => {
  const auth = await authProvider.login(credentials);

  const user = await getUserData(
    auth.responseData.token,
    auth.responseData.userId
  );
  setData(user);
};

const logout = (
  setData: (data: UserAttr | null) => void,
  queryClient: QueryClient
): void => {
  void authProvider.logout();
  queryClient.clear();
  setData(null);
};

const useAuth = (): AuthContextState => {
  const context = useContext(AuthContext);

  if (context === null) {
    throw new Error(`useAuth must be used within a AuthProvider`);
  }

  return context;
};

export { AuthProvider, useAuth, login, logout };
export type { AuthContextState };
