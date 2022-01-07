import { GiMuscleUp } from "react-icons/gi";

export const FullPageLoader = (): React.ReactElement => (
  <div className="flex justify-center items-center h-screen w-screen">
    <GiMuscleUp className="animate-bounce text-secondary h-20 w-20" />
  </div>
);
