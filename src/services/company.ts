import { useFetch } from "@context/fetch-context";

import {
  UseMutationResult,
  UseQueryResult,
  useMutation,
  useQuery,
  useQueryClient,
} from "react-query";

const COMPANY_ENDPOINT = "/api/Company";

const COMPANY_KEY = "company";

type CompanyAttr = {
  id: string;
  name: string;
  description: string;
  image: string;
  address: string;
  phone: string;
  email: string;
  instagramSite: string;
  facebookSite: string;
};

const useCompany = (): UseQueryResult<CompanyAttr> => {
  const authRequest = useFetch();
  const queryResult = useQuery([COMPANY_KEY, "active"], async () => {
    const response = await authRequest.get<CompanyAttr>(
      `${COMPANY_ENDPOINT}/active`
    );

    return response.data;
  });

  return queryResult;
};

const useCreateCompany = (): UseMutationResult<
  CompanyAttr,
  unknown,
  Omit<CompanyAttr, "id">
> => {
  const authRequest = useFetch();

  const queryClient = useQueryClient();

  const mutationResult = useMutation(
    async (company: Omit<CompanyAttr, "id">) => {
      const response = await authRequest.post<CompanyAttr>(
        COMPANY_ENDPOINT,
        company
      );

      return response.data;
    },
    { onSuccess: () => queryClient.invalidateQueries(COMPANY_KEY) }
  );

  return mutationResult;
};

const useEditCompany = (
  id: string
): UseMutationResult<CompanyAttr, unknown, Omit<CompanyAttr, "id">> => {
  const authRequest = useFetch();
  const queryClient = useQueryClient();
  const mutationResult = useMutation(
    async ({
      name,
      description,
      email,
      image,
      instagramSite,
      facebookSite,
      address,
      phone,
    }: Omit<CompanyAttr, "id">) => {
      const response = await authRequest.put<CompanyAttr>(
        `${COMPANY_ENDPOINT}/${id}`,
        {
          name,
          description,
          email,
          image,
          instagramSite,
          facebookSite,
          address,
          phone,
        }
      );

      return response.data;
    },
    { onSuccess: () => queryClient.invalidateQueries(COMPANY_KEY) }
  );

  return mutationResult;
};

export { COMPANY_KEY, useCompany, useCreateCompany, useEditCompany };
