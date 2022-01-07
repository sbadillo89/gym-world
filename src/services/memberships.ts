import { PageAttr } from "./common/types";
import { useFetch } from "@context/fetch-context";
import {
  UseInfiniteQueryResult,
  UseMutationResult,
  UseQueryResult,
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from "react-query";

const MEMBERSHIP_ENDPOINT = "/api/Membership";

const MEMBERSHIP_KEY = "Membership";

type MembershipAttr = {
  id: string;
  description: string;
  validityDays: number;
  price: number;
  discount: number;
  active: boolean;
  createdBy: string;
  createdDate: Date;
};

type MembershipPageAttr = PageAttr<MembershipAttr>;

const useMemberships = (
  pageNumber = 1,
  pageSize = 10
): UseInfiniteQueryResult<MembershipPageAttr> => {
  const authRequest = useFetch();
  const infiniteQueryResult = useInfiniteQuery(
    [MEMBERSHIP_KEY, `page=${pageNumber} size=${pageSize}`],
    async () => {
      const response = await authRequest.get<MembershipPageAttr>(
        `${MEMBERSHIP_ENDPOINT}?pageNumber=${pageNumber}&pageSize=${pageSize}`
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

const useMembership = (id: string): UseQueryResult<MembershipAttr> => {
  const authRequest = useFetch();
  const queryResult = useQuery([MEMBERSHIP_KEY, id], async () => {
    const response = await authRequest.get<MembershipAttr>(
      `${MEMBERSHIP_ENDPOINT}/${id}`
    );

    return response.data;
  });

  return queryResult;
};

const useCreateMembership = (): UseMutationResult<
  MembershipAttr,
  unknown,
  Omit<MembershipAttr, "id" | "createdBy" | "createdDate" | "active">
> => {
  const authRequest = useFetch();

  const queryClient = useQueryClient();

  const mutationResult = useMutation(
    async (
      membership: Omit<
        MembershipAttr,
        "id" | "createdBy" | "createdDate" | "active"
      >
    ) => {
      const response = await authRequest.post<MembershipAttr>(
        MEMBERSHIP_ENDPOINT,
        membership
      );

      return response.data;
    },
    { onSuccess: () => queryClient.invalidateQueries(MEMBERSHIP_KEY) }
  );

  return mutationResult;
};

const useEditMembership = (
  id: string
): UseMutationResult<
  MembershipAttr,
  unknown,
  Omit<MembershipAttr, "id" | "createdBy" | "createdDate">
> => {
  const authRequest = useFetch();
  const queryClient = useQueryClient();

  const mutationResult = useMutation(
    async (
      membership: Omit<MembershipAttr, "id" | "createdBy" | "createdDate">
    ) => {
      const response = await authRequest.put<MembershipAttr>(
        `${MEMBERSHIP_ENDPOINT}/${id}`,
        membership
      );

      return response.data;
    },
    { onSuccess: () => queryClient.invalidateQueries(MEMBERSHIP_KEY) }
  );

  return mutationResult;
};

export {
  useCreateMembership,
  useEditMembership,
  useMembership,
  useMemberships,
};
export type { MembershipAttr, MembershipPageAttr, MEMBERSHIP_KEY };
