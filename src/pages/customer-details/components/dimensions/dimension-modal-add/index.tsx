import { ErrorResponse } from "@services/common/types";
import { Fragment } from "react";
import { toast } from "react-hot-toast";
import { useCreateCustomerDimension } from "@services/customers";
import { useDisclosure } from "@utils/hooks/use-disclosure";
import { useParams } from "react-router-dom";
import { DimensionForm, DimensionFormData } from "../dimension-form";
import { Modal, ModalTitle } from "@components/modal";

const DimensionModalAdd = (): React.ReactElement => {
  const { isOpen, close, open } = useDisclosure();
  const { mutateAsync } = useCreateCustomerDimension();
  const { id } = useParams<{ id: string }>();

  const handleAddCustomer = ({ height, weight }: DimensionFormData): void => {
    const dimensionPromise = mutateAsync({
      height,
      weight,
      customerId: id,
    });

    void toast.promise(dimensionPromise, {
      loading: "Creando registro...",
      success: () => {
        close();

        return "registro creado exitosamente!";
      },
      error: (err: ErrorResponse) => `${err.Message}`,
    });
  };

  return (
    <Fragment>
      <div>
        <button
          className="h-8 w-full bg-primary-100 text-white mt-5 hover:bg-primary-200"
          onClick={open}
        >
          Agregar
        </button>
      </div>

      <Modal open={isOpen} onClose={close}>
        <div className="mx-1 w-60 sm:mx-14 sm:my-5 sm:space-y-8 max-w-lg">
          <ModalTitle className="text-secondary text-sm sm:text-2xl font-bold">
            Crear nuevo registro
          </ModalTitle>
          <div>
            <DimensionForm onSubmit={handleAddCustomer} onClose={close} />
          </div>
        </div>
      </Modal>
    </Fragment>
  );
};
export { DimensionModalAdd };
