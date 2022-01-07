import { DimensionModalAdd } from "./components/dimensions/dimension-modal-add";
import { Dimensions } from "./components/dimensions";
import { ErrorResponse } from "@services/common/types";
import { Fragment } from "react";
import { Skeleton } from "@components/skeleton";
import { Tab } from "@headlessui/react";
import dayjs from "dayjs";
import { toast } from "react-hot-toast";
import { CustomerForm, CustomerFormData } from "../customers/customer-form";
import {
  useCustomer,
  useCustomerMemberships,
  useEditCustomer,
} from "@services/customers";
import { useHistory, useParams } from "react-router-dom";

const CustomerDetails = (): React.ReactElement => {
  const { id } = useParams<{ id: string }>();

  const history = useHistory();

  const { data, isLoading } = useCustomer(id);
  const { data: memberships } = useCustomerMemberships(id);
  const { mutateAsync } = useEditCustomer(id);

  const handleOnSubmit = ({
    firstName,
    lastName,
    age,
    address,
    gender,
    phone,
    dateOfBirth,
  }: CustomerFormData): void => {
    const customerPromise = mutateAsync({
      firstName,
      lastName,
      age,
      address,
      gender,
      phone,
      dateOfBirth: dateOfBirth || data?.dateOfBirth,
    });

    void toast.promise(customerPromise, {
      loading: "Actualizando cliente...",
      success: () => {
        history.goBack();

        return "Cliente actualizado exitosamente!";
      },
      error: (err: ErrorResponse) => `${err.Message}`,
    });
  };

  const classNames = (...classes): string => {
    return classes.filter(Boolean).join(" ");
  };

  return (
    <Fragment>
      {!data || isLoading ? (
        <Skeleton width="h-56" />
      ) : (
        <div className="grid grid-cols-12 gap-2">
          <div className="col-span-12 sm:col-span-9">
            <Tab.Group>
              <Tab.List className="flex p-1 space-x-1 bg-gray-800 rounded-xl">
                <Tab
                  className={({ selected }) =>
                    classNames(
                      "w-full py-2.5 text-sm leading-5 font-medium text-gray-800 rounded-lg",
                      "focus:outline-none  ring-opacity-60",
                      selected
                        ? "bg-primary-100 shadow"
                        : "text-primary-100 hover:bg-gray-900 hover:text-white"
                    )
                  }
                >
                  Información del cliente
                </Tab>
                <Tab
                  className={({ selected }) =>
                    classNames(
                      "w-full py-2.5 text-sm leading-5 font-medium text-gray-800 rounded-lg",
                      "focus:outline-none  ring-opacity-60",
                      selected
                        ? "bg-primary-100 shadow"
                        : "text-primary-100 hover:bg-gray-900 hover:text-white"
                    )
                  }
                >
                  Membresías activas
                </Tab>
              </Tab.List>
              <Tab.Panels className="mt-5">
                <Tab.Panel>
                  <CustomerForm
                    data={data}
                    onSubmit={handleOnSubmit}
                    textOperation="Guardar"
                  />
                </Tab.Panel>
                <Tab.Panel>
                  {memberships &&
                    memberships.map((m) => {
                      return (
                        <div
                          key={m.membership}
                          className="flex gap-x-3 sm:gap-x-5 flex-grow shadow-md p-4 border-l-8 border-primary-100 mb-3 rounded-l-md hover:bg-gray-50 text-sm sm:text-base"
                        >
                          <h2 className="font-semibold">{m.membership}</h2>
                          <h3>
                            Activa desde
                            <span className="font-semibold">
                              {" "}
                              {`${dayjs(m.initialDate).format("DD/MM/YYYY")}`}
                            </span>
                          </h3>
                          <h3>
                            Hasta
                            <span className="font-semibold">
                              {" "}
                              {`${dayjs(m.finalDate).format("DD/MM/YYYY")}`}
                            </span>
                          </h3>
                        </div>
                      );
                    })}
                </Tab.Panel>
              </Tab.Panels>
            </Tab.Group>
          </div>
          <div className="w-full col-span-12 sm:col-span-3 relative my-5 sm:mt-0">
            <div
              className="border shadow-md rounded-lg p-0 sm:p-2 max-h-screen
                     absolute left-0 right-0 top-0 overflow-y-auto"
            >
              <Dimensions dimensions={data.customerDimensions} />
              <DimensionModalAdd />
            </div>
          </div>
        </div>
      )}
    </Fragment>
  );
};

export { CustomerDetails };
