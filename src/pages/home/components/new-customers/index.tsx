import { Stat } from "@components/stat";
import { useNewCustomers } from "@services/reports";

const NewCustomers = (): React.ReactElement => {
  const { data } = useNewCustomers();

  return (
    <div className="h-40">
      <Stat
        description="nuevos clientes"
        label="cantidad"
        value={data ? data.total.toString() : "Sin información."}
        color="bg-purple-900"
      />
    </div>
  );
};

export { NewCustomers };
