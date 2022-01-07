import { Button } from "@components/butons/button";
import { ErrorResponse } from "@services/common/types";
import { FaIdCard } from "react-icons/fa";
import { Fragment } from "react";
import { MembershipForm } from "../components/memberships/membership-form";
import { toast } from "react-hot-toast";
import { useDisclosure } from "@utils/hooks/use-disclosure";
import { MembershipAttr, useCreateMembership } from "@services/memberships";
import { Modal, ModalTitle } from "@components/modal";

const MembershipModalAdd = (): React.ReactElement => {
  const { isOpen, close, open } = useDisclosure();
  const { mutateAsync } = useCreateMembership();

  const handleCreateMembership = (membership: MembershipAttr): void => {
    const membershipPromise = mutateAsync(membership);
    void toast.promise(membershipPromise, {
      loading: "Creando membresía...",
      success: () => {
        close();

        return "Membresía creada exitosamente!";
      },
      error: (err: ErrorResponse) => `${err.Message}`,
    });
    toast;
  };

  return (
    <Fragment>
      <div className="flex justify-start mt-4">
        <Button
          type="button"
          width="w-52"
          appearance="primary"
          leftIcon={FaIdCard}
          onClick={open}
        >
          Nueva membresía
        </Button>
      </div>

      <Modal open={isOpen} onClose={close}>
        <div className="mx-1 w-64 sm:w-80 sm:mx-14 max-w-lg">
          <ModalTitle className="text-secondary text-sm sm:text-xl font-bold mb-6">
            Crear membresía
          </ModalTitle>
          <MembershipForm
            operation="Save"
            close={close}
            onSumbit={handleCreateMembership}
          />
        </div>
      </Modal>
    </Fragment>
  );
};

export { MembershipModalAdd };
