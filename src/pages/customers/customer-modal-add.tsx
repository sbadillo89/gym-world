import { Button } from "@components/butons/button";
import { ErrorResponse } from "@services/common/types";
import { Fragment } from "react";
import { HiUserAdd } from "react-icons/hi";
import { toast } from "react-hot-toast";
import { useCreateCustomer } from "@services/customers";
import { useDisclosure } from "@utils/hooks/use-disclosure";
import { CustomerForm, CustomerFormData } from "./customer-form";
import { Modal, ModalTitle } from "@components/modal";

const CustomerModalAdd = (): React.ReactElement => {
  const { isOpen, close, open } = useDisclosure();
  const { mutateAsync } = useCreateCustomer();

  const handleAddCustomer = ({
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
      dateOfBirth,
    });

    void toast.promise(customerPromise, {
      loading: "Creando cliente...",
      success: () => {
        close();

        return "Cliente creado exitosamente!";
      },
      error: (err: ErrorResponse) => `${err.Message}`,
    });
  };

  return (
    <Fragment>
      <div className="flex justify-start mt-4">
        <Button
          type="button"
          width="w-52"
          appearance="primary"
          leftIcon={HiUserAdd}
          onClick={open}
        >
          Nuevo cliente
        </Button>
      </div>

      <Modal open={isOpen} onClose={close}>
        <div className="mx-1 w-80 sm:w-96 sm:mx-14 max-w-lg">
          <ModalTitle className="text-secondary text-sm sm:text-xl font-bold mb-6">
            Crear cliente
          </ModalTitle>

          <CustomerForm
            onSubmit={handleAddCustomer}
            close={close}
            textOperation="Guardar"
            enableClose
          />
        </div>
      </Modal>
    </Fragment>
  );
};
export { CustomerModalAdd };
