import Dinero from "dinero.js";
import { Stat } from "@components/stat";
import { useTotalPerMonth } from "@services/reports";

const TotalPerMonth = (): React.ReactElement => {
  const { data } = useTotalPerMonth();

  return (
    <div className="h-40">
      <Stat
        description="ingresos en el mes"
        label="total"
        value={
          data
            ? Dinero({ amount: data.total * 100 }).toFormat("$0,0")
            : "Sin información."
        }
      />
    </div>
  );
};

export { TotalPerMonth };
