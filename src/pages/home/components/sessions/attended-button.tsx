import { ErrorResponse } from "@services/common/types";
import { FaCheck } from "react-icons/fa";
import { toast } from "react-hot-toast";
import { useEditSession } from "@services/sessions";

type AttendedButtonProps = {
  sessionId: string;
};

const AttendedButton = ({
  sessionId,
}: AttendedButtonProps): React.ReactElement => {
  const { mutateAsync } = useEditSession();

  const handleAttendedSession = (): void => {
    const sessionPromise = mutateAsync(sessionId);
    void toast.promise(sessionPromise, {
      loading: "Actualizando sesion...",
      success: () => {
        return "Sesion actualizada exitosamente!";
      },
      error: (err: ErrorResponse) => `${err.Message}`,
    });
  };

  return (
    <FaCheck
      className="h-5 w-5 text-primary-100 hover:text-primary-200 cursor-pointer"
      onClick={handleAttendedSession}
    />
  );
};

export { AttendedButton };
