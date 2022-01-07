import { ErrorResponse } from "@services/common/types";
import { MembershipForm } from "../components/memberships/membership-form";
import { Skeleton } from "@components/skeleton";
import { toast } from "react-hot-toast";
import {
  MembershipAttr,
  useEditMembership,
  useMembership,
} from "@services/memberships";
import { useHistory, useParams } from "react-router-dom";

const MembershipDetails = (): React.ReactElement => {
  const { id } = useParams<{ id: string }>();
  const { data, isLoading } = useMembership(id);

  const history = useHistory();

  const { mutateAsync } = useEditMembership(id);

  const handleEditMembership = (membership: MembershipAttr): void => {
    const membershipPromise = mutateAsync(membership);
    void toast.promise(membershipPromise, {
      loading: "Actualizando membresía...",
      success: () => {
        history.goBack();

        return "Membresía actualizada exitosamente!";
      },
      error: (err: ErrorResponse) => `${err.Message}`,
    });
    toast;
  };

  return (
    <div>
      {isLoading || !data ? (
        <Skeleton height={"h-64"} />
      ) : (
        <MembershipForm
          data={data}
          operation="Edit"
          onSumbit={handleEditMembership}
        />
      )}
    </div>
  );
};

export { MembershipDetails };
