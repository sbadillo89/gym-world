import { UserAttr } from "@services/users";
import { publicRequest } from "@utils/public-request";
import { AuthAttr, AuthResponseAttr } from "@services/common/types";

const AUTH_KEY = "_47cm272d34_1mib8yu~~!!@#E89s ./dmdjkniuyqc";
const AUTH_ENDPOINT = "/api/Auth";

const removeAuthInCache = (): void => window.localStorage.removeItem(AUTH_KEY);

const setAuthInCache = (auth: AuthAttr): void =>
  window.localStorage.setItem(AUTH_KEY, JSON.stringify(auth));

/**
 *
 * @description Retrieves the user's auth state from localStorage
 */
function getAuthFromCache(throwOnNoCache: true): AuthAttr;
function getAuthFromCache(throwOnNoCache?: false): AuthAttr | null;
// eslint-disable-next-line prefer-arrow/prefer-arrow-functions -- Can't do overloading with arrow functions
function getAuthFromCache(throwOnNoCache = false): AuthAttr | null {
  const serializedAuthState = localStorage.getItem(AUTH_KEY);

  if (serializedAuthState) {
    return JSON.parse(serializedAuthState) as AuthAttr;
  }

  if (throwOnNoCache) {
    throw new Error(
      "throwOnNoCache = true must be used after a successful user's login"
    );
  }

  return null;
}

/**
 * @description Retrieves the user's auth information and creates a cache with it in localStorage
 */
const login = async (credentials: {
  email: string;
  password: string;
}): Promise<AuthResponseAttr> => {
  const response = await publicRequest.post<AuthResponseAttr>(
    `${AUTH_ENDPOINT}/login`,
    credentials
  );
  const auth = response.data;

  setAuthInCache(auth.responseData);

  return auth;
};

/**
 * @description Revokes the user's refresh token and clears the auth cache. It must be used after a successful user's login
 */
const logout = async (): Promise<void> => {
  const auth = getAuthFromCache(true);

  await publicRequest.post<void>(
    `${AUTH_ENDPOINT}/revokeRefreshToken`,
    {
      refresh_token: auth.refresh_token,
    },
    {
      headers: {
        Authorization: `Bearer ${auth.token}`,
      },
    }
  );

  removeAuthInCache();
};

/**
 * @description Refresh the user's auth state. It must be used after a successful user's login
 */
const refreshAuth = async (): Promise<void> => {
  const auth = getAuthFromCache(true);

  const response = await publicRequest.post<AuthAttr>(
    `${AUTH_ENDPOINT}/refreshToken`,
    {
      refresh_token: auth.refresh_token,
    },
    {
      headers: {
        Authorization: `Bearer ${auth.token}`,
      },
    }
  );

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const refreshedAuth = response.data;

  //setAuthInCache({ ...refreshedAuth, userId: auth.userId });
};

type RecoverTicketAttr = { status: boolean };

/**
 * @description Verifies if the recover token was created in less than 12 hours ago
 */
const verifyRecoverTicket = async (
  ticket: string
): Promise<RecoverTicketAttr> => {
  const response = await publicRequest.get<RecoverTicketAttr>(
    `${AUTH_ENDPOINT}/verifyTicket`,
    { params: { ticket } }
  );

  return response.data;
};

const changePassword = async (newPassword: {
  ticket: string;
  password: string;
}): Promise<void> => {
  await publicRequest.patch<void>(
    `${AUTH_ENDPOINT}/changePassword`,
    newPassword
  );
};

/**
 * @description Creates a new applicant user
 */
const register = async (
  user: Pick<UserAttr, "firstName" | "lastName" | "password" | "email">
): Promise<AuthResponseAttr> => {
  const response = await publicRequest.post<AuthResponseAttr>(
    `${AUTH_ENDPOINT}/signup`,
    user
  );

  return response.data;
};

export {
  login,
  logout,
  verifyRecoverTicket,
  changePassword,
  register,
  refreshAuth,
  getAuthFromCache,
  removeAuthInCache,
};
