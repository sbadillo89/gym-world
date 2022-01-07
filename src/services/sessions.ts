import { PageAttr } from "./common/types";
import { useFetch } from "@context/fetch-context";
import {
  UseInfiniteQueryResult,
  UseMutationResult,
  useInfiniteQuery,
  useMutation,
  useQueryClient,
} from "react-query";

const ENDPOINT_SESSIONS = "/api/MembershipSession";

const CUSTOMER_MEMBERSHIP_SESSIONS_ENDPOINT =
  "/api/CustomerMembership/GetSessionsByDay";

const SESSIONS_KEY = "sessions";

type SessionsAttr = {
  customerId: string;
  customer: string;
  customerMembershipId: string;
  date: Date;
  attended: boolean;
  membershiSessionpId: string;
};

type SessionsPageAttr = PageAttr<SessionsAttr>;

const useCustomerSessions = (
  pageNumber = 1,
  pageSize = 10
): UseInfiniteQueryResult<SessionsPageAttr> => {
  const authRequest = useFetch();
  const infiniteQueryResult = useInfiniteQuery(
    [SESSIONS_KEY, "sessions", `page=${pageNumber} size=${pageSize}`],
    async () => {
      const response = await authRequest.get<SessionsPageAttr>(
        `${CUSTOMER_MEMBERSHIP_SESSIONS_ENDPOINT}?pageNumber=${pageNumber}&pageSize=${pageSize}`
      );

      return response.data;
    },
    {
      getNextPageParam: (lastPage, allPages) =>
        allPages.length < lastPage.totalPages ? allPages.length + 1 : undefined,
      keepPreviousData: true,
    }
  );

  return infiniteQueryResult;
};

const useEditSession = (): UseMutationResult<SessionsAttr, unknown, string> => {
  const authRequest = useFetch();
  const queryClient = useQueryClient();

  const mutationResult = useMutation(
    async (membershiSessionpId: string) => {
      const response = await authRequest.put<SessionsAttr>(
        `${ENDPOINT_SESSIONS}/${membershiSessionpId}`
      );

      return response.data;
    },
    {
      onSuccess: () => {
        void queryClient.invalidateQueries(SESSIONS_KEY);
      },
    }
  );

  return mutationResult;
};

export { SESSIONS_KEY, useCustomerSessions, useEditSession };
export type { SessionsAttr };
