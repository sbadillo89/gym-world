import axios, { AxiosInstance } from "axios";
import { createContext, useContext, useEffect, useRef } from "react";
import { getAuthFromCache, refreshAuth } from "@utils/auth-provider";

const getAccessTokenFromCache = (): string => {
  const auth = getAuthFromCache(true);

  return auth.token;
};

const FetchContext = createContext<AxiosInstance | null>(null);
if (process.env.NODE_ENV === "development") {
  FetchContext.displayName = "FetchContext";
}

type FetchProviderProps = {
  children?: React.ReactNode;
};

const FetchProvider = ({
  children,
}: FetchProviderProps): React.ReactElement => {
  const accessTokenRef = useRef(getAccessTokenFromCache());
  useEffect(() => {
    const refreshAuthTimeout = window.setInterval(
      () => {
        void refreshAuth().then(() => {
          accessTokenRef.current = getAccessTokenFromCache();
        });
      },
      // 9 minutes
      540000
    );

    return () => {
      window.clearInterval(refreshAuthTimeout);
    };
  }, []);

  const authRequest = axios.create({
    baseURL: process.env.REACT_APP_API_BACKEND,
  });
  authRequest.interceptors.request.use(
    (config) => ({
      ...config,
      headers: {
        Authorization: `Bearer ${accessTokenRef.current}`,
      },
    }),
    (error) => Promise.reject(error)
  );

  return (
    <FetchContext.Provider value={authRequest}>
      {children}
    </FetchContext.Provider>
  );
};

const useFetch = (): AxiosInstance => {
  const context = useContext(FetchContext);
  if (context === null) {
    throw new Error("useFetch must be used within a FetchProvider");
  }

  return context;
};

export { FetchProvider, useFetch };
