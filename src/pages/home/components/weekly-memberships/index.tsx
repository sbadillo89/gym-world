import { BarChart } from "@components/charts/bar";
import { useWeeklyMemberships } from "@services/reports";

const WeeklyMemberships = (): React.ReactElement => {
  const { data } = useWeeklyMemberships();

  return (
    <div className="h-64">
      {data ? (
        <BarChart
          data={data}
          indexBy="date"
          padding={0.1}
          innerPadding={0.1}
          keys={["quantity", "total"]}
        />
      ) : (
        <div className="flex justify-center items-center h-full">
          <p>No hay información disponible</p>
        </div>
      )}
    </div>
  );
};

export { WeeklyMemberships };
