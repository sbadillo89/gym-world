import { Autocomplete } from "@components/forms/autocomplete";
import { Button } from "@components/butons/button";
import Dinero from "dinero.js";
import { ErrorResponse } from "@services/common/types";
import { FaUserPlus } from "react-icons/fa";
import { Form } from "@components/forms";
import dayjs from "dayjs";
import { toast } from "react-hot-toast";
import { useCreateCustomerMembership } from "@services/customer-membership";
import { useCustomerNames } from "@services/customers";
import { useDisclosure } from "@utils/hooks/use-disclosure";
import { useMembership } from "@services/memberships";
import { Fragment, useEffect, useState } from "react";
import { Modal, ModalTitle } from "@components/modal";

type BuyMembershipModalProps = {
  membershipId: string;
};

type CustomersFormData = {
  customerName: string;
};

const BuyMembershipModal = ({
  membershipId,
}: BuyMembershipModalProps): React.ReactElement => {
  const { open, isOpen, close } = useDisclosure();
  const { data: membership } = useMembership(membershipId);
  const { data: customerNames, isLoading } = useCustomerNames();
  const { mutateAsync } = useCreateCustomerMembership();
  const [options, setOptions] =
    useState<Array<{ id: string; customer: string }>>();

  useEffect(() => {
    if (!isLoading) {
      setOptions(customerNames);
    }
  }, [customerNames, isLoading]);

  const handleOnSubmit = ({ customerName }: CustomersFormData): void => {
    const customerSelected =
      options && options.find((x) => x.customer == customerName);
    const customerId = customerSelected ? customerSelected.id : "0";
    const membershipId = membership ? membership?.id : "0";

    const promise = mutateAsync({
      customerId: customerId,
      membershipId: membershipId,
    });
    void toast.promise(promise, {
      loading: "Adquiriendo membresía...",
      success: () => {
        close();

        return "Proceso completado con éxito.";
      },
      error: (err: ErrorResponse) => `${err.Message}`,
    });
  };

  return (
    <Fragment>
      <FaUserPlus
        onClick={open}
        className="h-5 w-5 cursor-pointer inline hover:text-primary-100"
      />
      <Modal open={isOpen} onClose={close}>
        <div className="mx-1 w-64 sm:w-80 sm:mx-10 max-w-lg">
          <ModalTitle className="text-secondary text-sm sm:text-xl font-bold mb-6">
            Adquirir membresía
          </ModalTitle>
          <div id="data-customer-membership">
            <Form<CustomersFormData> onSubmit={handleOnSubmit} className="mb-5">
              <div className="mb-6">
                <Autocomplete
                  key={!customerNames ? 0 : 1}
                  label="Cliente"
                  placeholder="--seleccione--"
                  options={options?.map((x) => x.customer)}
                  srLabel
                  name="customerName"
                />
              </div>
              <input
                name="membershipId"
                className="invisible w-0"
                value={membership && membership.id}
                type="hidden"
              />
              <div className="flex flex-col gap-y-4 mb-5">
                <div>
                  Tipo de membresía
                  <h2 className="font-bold text-3xl text-primary-100">
                    {membership && membership.description}
                  </h2>
                </div>
                <div className="flex justify-between">
                  <div className="flex flex-col items-start leading-none">
                    <span>Precio</span>
                    <h2 className="font-bold text-3xl text-primary-100">
                      {membership &&
                        Dinero({ amount: membership.price * 100 }).toFormat(
                          "$0,0"
                        )}
                    </h2>
                  </div>
                  <div className="flex flex-col items-start leading-none">
                    <span>Vigencia</span>
                    <h2 className="font-bold text-3xl text-primary-100">
                      {membership && membership.validityDays} días
                    </h2>
                    {membership && (
                      <small className="text-secondary italic">
                        vence:{" "}
                        {dayjs()
                          .add(membership.validityDays, "day")
                          .format("YYYY/MM/DD")}
                      </small>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex gap-x-4 items-center justify-center">
                <Button type="submit" appearance="primary">
                  Comprar
                </Button>
                <Button type="button" appearance="primary" onClick={close}>
                  Cerrar
                </Button>
              </div>
            </Form>
          </div>
        </div>
      </Modal>
    </Fragment>
  );
};

export { BuyMembershipModal };
