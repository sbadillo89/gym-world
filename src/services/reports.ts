import { useFetch } from "@context/fetch-context";
import { UseQueryResult, useQuery } from "react-query";

const REPORTS_ENDPOINT = "/api/Report";
const ENDPOINT_WEEKLY_MEMBERSHIP = `${REPORTS_ENDPOINT}/GetWeeklyMembership`;
const TOTAL_PER_MONTH_ENDPOINT = `${REPORTS_ENDPOINT}/TotalIncomePerMonth`;
const NEW_CUSTOMERS_ENDPOINT = `${REPORTS_ENDPOINT}/NewCustomers`;

const ACCOUNTING_KEY = "reports";

type WeeklyMembershipAttr = {
  quantity: number;
  total: number;
  date: string;
};

type TotalPerMonthAttr = {
  mes: string;
  total: number;
};

const useWeeklyMemberships = (): UseQueryResult<
  Array<WeeklyMembershipAttr>
> => {
  const authRequest = useFetch();
  const queryResult = useQuery(
    [ACCOUNTING_KEY, "WeeklyMemberships"],
    async () => {
      const response = await authRequest.get<Array<WeeklyMembershipAttr>>(
        `${ENDPOINT_WEEKLY_MEMBERSHIP}`
      );

      return response.data;
    }
  );

  return queryResult;
};

const useTotalPerMonth = (): UseQueryResult<TotalPerMonthAttr> => {
  const authRequest = useFetch();

  const mutationResult = useQuery(
    [ACCOUNTING_KEY, "TotalPerMonth"],
    async () => {
      const response = await authRequest.get<TotalPerMonthAttr>(
        TOTAL_PER_MONTH_ENDPOINT
      );

      return response.data;
    }
  );

  return mutationResult;
};

const useNewCustomers = (): UseQueryResult<TotalPerMonthAttr> => {
  const authRequest = useFetch();

  const mutationResult = useQuery(
    [ACCOUNTING_KEY, "NewCustomers"],
    async () => {
      const response = await authRequest.get<TotalPerMonthAttr>(
        NEW_CUSTOMERS_ENDPOINT
      );

      return response.data;
    }
  );

  return mutationResult;
};

export { useWeeklyMemberships, useNewCustomers, useTotalPerMonth };
export type { WeeklyMembershipAttr };
