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

const CUSTOMER_ENDPOINT = "/api/Customer";
const CUSTOMER_DIMENSION_ENDPOINT = `${CUSTOMER_ENDPOINT}/Dimension`;
const CUSTOMER_NAMES_ENDPOINT = `${CUSTOMER_ENDPOINT}/GetCustomersName`;
const CUSTOMER_MEMBERSHIPS_ENDPOINT = (id: string): string =>
  `${CUSTOMER_ENDPOINT}/Memberships/${id}`;
const CUSTOMER_BIRTHDAYS_ENDPOINT = "/api/Customer/GetAllBirthdays";

const CUSTOMER_KEY = "customer";

type DimensionAttr = {
  id: string;
  customerId: string;
  weight: number;
  height: number;
  createdDate: Date;
};

type CustomerAttr = {
  id: string;
  firstName: string;
  lastName: string;
  age: number;
  gender: string;
  phone: string;
  address: string;
  dateOfBirth: Date;
  createdBy: string;
  createdDate: Date;
  lastActivity: Date;
  customerDimensions: Array<DimensionAttr>;
};

type CustomerOptionsAttr = {
  id: string;
  customer: string;
};

type CustomerMembershipsAttr = {
  membership: string;
  initialDate: Date;
  finalDate: Date;
};

type CustomersPageAttr = PageAttr<CustomerAttr>;

type CustomerBirthdaysAttr = CustomerAttr;

type CustomerBirthdaysPageAttr = PageAttr<CustomerBirthdaysAttr>;

const useCustomers = (
  pageNumber = 1,
  pageSize = 10
): UseInfiniteQueryResult<CustomersPageAttr> => {
  const authRequest = useFetch();
  const infiniteQueryResult = useInfiniteQuery(
    [CUSTOMER_KEY, `page=${pageNumber} size=${pageSize}`],
    async () => {
      const response = await authRequest.get<CustomersPageAttr>(
        `${CUSTOMER_ENDPOINT}?pageNumber=${pageNumber}&pageSize=${pageSize}`
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

const useCustomer = (id: string): UseQueryResult<CustomerAttr> => {
  const authRequest = useFetch();
  const queryResult = useQuery([CUSTOMER_KEY, id], async () => {
    const response = await authRequest.get<CustomerAttr>(
      `${CUSTOMER_ENDPOINT}/${id}`
    );

    return response.data;
  });

  return queryResult;
};

const useCreateCustomer = (): UseMutationResult<
  CustomerAttr,
  unknown,
  Omit<
    CustomerAttr,
    "id" | "lastActivity" | "createdDate" | "createdBy" | "customerDimensions"
  >
> => {
  const authRequest = useFetch();

  const queryClient = useQueryClient();

  const mutationResult = useMutation(
    async (
      customer: Omit<
        CustomerAttr,
        | "id"
        | "lastActivity"
        | "createdDate"
        | "createdBy"
        | "customerDimensions"
      >
    ) => {
      const response = await authRequest.post<CustomerAttr>(
        CUSTOMER_ENDPOINT,
        customer
      );

      return response.data;
    },
    { onSuccess: () => queryClient.invalidateQueries(CUSTOMER_KEY) }
  );

  return mutationResult;
};

const useEditCustomer = (
  id: string
): UseMutationResult<
  CustomerAttr,
  unknown,
  Omit<
    CustomerAttr,
    "id" | "lastActivity" | "createdDate" | "createdBy" | "customerDimensions"
  >
> => {
  const authRequest = useFetch();
  const queryClient = useQueryClient();
  const mutationResult = useMutation(
    async (
      customer: Omit<
        CustomerAttr,
        | "id"
        | "lastActivity"
        | "createdDate"
        | "createdBy"
        | "customerDimensions"
      >
    ) => {
      const response = await authRequest.put<CustomerAttr>(
        `${CUSTOMER_ENDPOINT}/${id}`,
        customer
      );

      return response.data;
    },
    { onSuccess: () => queryClient.invalidateQueries(CUSTOMER_KEY) }
  );

  return mutationResult;
};

const useCreateCustomerDimension = (): UseMutationResult<
  DimensionAttr,
  unknown,
  Omit<DimensionAttr, "id" | "createdDate">
> => {
  const authRequest = useFetch();

  const queryClient = useQueryClient();

  const mutationResult = useMutation(
    async (dimension: Omit<DimensionAttr, "id" | "createdDate">) => {
      const response = await authRequest.post<DimensionAttr>(
        CUSTOMER_DIMENSION_ENDPOINT,
        dimension
      );

      return response.data;
    },
    { onSuccess: () => queryClient.invalidateQueries(CUSTOMER_KEY) }
  );

  return mutationResult;
};

const useCustomerNames = (): UseQueryResult<Array<CustomerOptionsAttr>> => {
  const authRequest = useFetch();

  const queryResult = useQuery([CUSTOMER_KEY, "customerNames"], async () => {
    const response = await authRequest.get<Array<CustomerOptionsAttr>>(
      CUSTOMER_NAMES_ENDPOINT
    );

    return response.data;
  });

  return queryResult;
};

const useCustomerMemberships = (
  id: string
): UseQueryResult<Array<CustomerMembershipsAttr>> => {
  const authRequest = useFetch();

  const queryResult = useQuery([CUSTOMER_KEY, "memberships", id], async () => {
    const response = await authRequest.get<Array<CustomerMembershipsAttr>>(
      CUSTOMER_MEMBERSHIPS_ENDPOINT(id)
    );

    return response.data;
  });

  return queryResult;
};

const useCustomerBirthdays = (
  pageNumber = 1,
  pageSize = 10
): UseInfiniteQueryResult<CustomerBirthdaysPageAttr> => {
  const authRequest = useFetch();
  const infiniteQueryResult = useInfiniteQuery(
    [CUSTOMER_KEY, "Birthdays", `page=${pageNumber} size=${pageSize}`],
    async () => {
      const response = await authRequest.get<CustomerBirthdaysPageAttr>(
        `${CUSTOMER_BIRTHDAYS_ENDPOINT}?pageNumber=${pageNumber}&pageSize=${pageSize}`
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
export {
  CUSTOMER_KEY,
  useCustomer,
  useCustomers,
  useCustomerBirthdays,
  useCustomerMemberships,
  useCustomerNames,
  useCreateCustomer,
  useCreateCustomerDimension,
  useEditCustomer,
};

export type { CustomerAttr, DimensionAttr, CustomerBirthdaysAttr };
