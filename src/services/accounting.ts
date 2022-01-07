import { useFetch } from "@context/fetch-context";
import { UseQueryResult, useQuery } from "react-query";

const ENDPOINT_ACCOUNTING = "/api/Accounting";
const ACCOUNTING_KEY = "accounting";

type AccountingAttr = {
  id: string;
  userId: string;
  date: Date;
  initialValue: number;
  revenue: number;
  egress: number;
  finalValue: number;
  openDate: Date;
  closeDate: Date;
  createdDate: Date;
};

const useAccounting = (): UseQueryResult<AccountingAttr> => {
  const authRequest = useFetch();
  const queryResult = useQuery([ACCOUNTING_KEY], async () => {
    const response = await authRequest.get<AccountingAttr>(
      `${ENDPOINT_ACCOUNTING}/GetActive`
    );

    return response.data;
  });

  return queryResult;
};

export { useAccounting };
export type { AccountingAttr };
