import { RoleAttr } from "./common/types";
import { publicRequest } from "@utils/public-request";
import { useFetch } from "@context/fetch-context";
import { UseQueryOptions, UseQueryResult, useQuery } from "react-query";

const USERS_ENDPOINT = "/api/User";

type UserAttr = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  roleId: string;
  isAdmin: boolean;
  active: boolean;
  createdDate: Date;
  role: RoleAttr;
};

const useUser2 = async (id: string, authToken: string): Promise<UserAttr> => {
  const response = await publicRequest.get<UserAttr>(
    `${USERS_ENDPOINT}/${id}`,
    {
      headers: {
        "Access-Control-Allow-Origin": "*",
        Authorization: `Bearer ${authToken}`,
      },
    }
  );

  return response.data;
};

const useUser = (
  userId: string,
  config?: UseQueryOptions<UserAttr>
): UseQueryResult<UserAttr> => {
  const authRequest = useFetch();

  return useQuery(
    "userDetail",
    async () => {
      const response = await authRequest.get<UserAttr>(
        `${USERS_ENDPOINT}/${userId}`
      );

      return response.data;
    },
    config
  );
};

export { useUser, useUser2 };

export type { UserAttr };
