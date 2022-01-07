import { MotionProps } from "@nivo/core";
import { BarDatum, ResponsiveBar } from "@nivo/bar";

export type BarChartProps = {
  data: Array<BarDatum>;
  innerPadding: number;
  indexBy: string;
  padding: number;
  keys: Array<string>;
} & Pick<MotionProps, "animate" | "motionDamping" | "motionStiffness">;

export const BarChart = ({
  indexBy = "date",
  innerPadding = 0,
  padding = 0.1,
  data,
  keys,
}: BarChartProps): React.ReactElement => (
  <ResponsiveBar
    indexBy={indexBy}
    padding={padding}
    groupMode="grouped"
    valueScale={{ type: "linear" }}
    indexScale={{ type: "band", round: true }}
    axisTop={null}
    axisRight={null}
    legends={[
      {
        dataFrom: "keys",
        anchor: "top-right",
        direction: "column",
        justify: false,
        translateX: 0,
        translateY: -52,
        itemsSpacing: 0,
        itemWidth: 10,
        itemHeight: 20,
        itemDirection: "right-to-left",
        itemOpacity: 0.85,
        symbolSize: 15,
        symbolShape: "circle",
        effects: [
          {
            on: "hover",
            style: {
              itemOpacity: 1,
            },
          },
        ],
      },
    ]}
    animate={true}
    innerPadding={innerPadding}
    margin={{ bottom: 20, left: 30, top: 50 }}
    data={data}
    colors={["#C7D2FE", "#6366F1"]}
    keys={keys}
    axisBottom={{
      tickSize: 5,
      tickPadding: 5,
      tickRotation: 0,
      legendPosition: "middle",
      legendOffset: 32,
    }}
    axisLeft={{
      tickSize: 5,
      tickPadding: -5,
      tickRotation: 0,
      legendPosition: "middle",
      legendOffset: -40,
    }}
  />
);
