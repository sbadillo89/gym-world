import { CUSTOMER_KEY } from "./customers";
import { useFetch } from "@context/fetch-context";
import { UseMutationResult, useMutation, useQueryClient } from "react-query";

const CUSTOMER_MEMBERSHIP_ENDPOINT = "/api/CustomerMembership";

const CUSTOMER_MEMBERSHIP_KEY = "customer-membership";

type CustomerMembershipAttr = {
  id: string;
  membershipId: string;
  customerId: string;
  initialDate: Date;
  finalDate: Date;
  total: number;
  active: boolean;
  createdDate: Date;
};

const useCreateCustomerMembership = (): UseMutationResult<
  CustomerMembershipAttr,
  unknown,
  Omit<
    CustomerMembershipAttr,
    "id" | "active" | "total" | "initialDate" | "finalDate" | "createdDate"
  >
> => {
  const authRequest = useFetch();

  const queryClient = useQueryClient();

  const mutationResult = useMutation(
    async (
      customer: Omit<
        CustomerMembershipAttr,
        "id" | "active" | "total" | "initialDate" | "finalDate" | "createdDate"
      >
    ) => {
      const response = await authRequest.post<CustomerMembershipAttr>(
        CUSTOMER_MEMBERSHIP_ENDPOINT,
        customer
      );

      return response.data;
    },
    {
      onSuccess: () => {
        void queryClient.invalidateQueries(CUSTOMER_MEMBERSHIP_KEY);
        void queryClient.invalidateQueries(CUSTOMER_KEY);
      },
    }
  );

  return mutationResult;
};

export { CUSTOMER_MEMBERSHIP_KEY, useCreateCustomerMembership };

export type { CustomerMembershipAttr };
