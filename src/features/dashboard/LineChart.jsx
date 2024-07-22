/* eslint-disable react/prop-types */
/* eslint-disable no-mixed-spaces-and-tabs */
import styled from "styled-components";
import DashboardBox from "./DashboardBox";
import Heading from "../../ui/style/Heading";
import { eachDayOfInterval, format, isSameDay, subDays } from "date-fns";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { useDarkMode } from "../../context/DarkModeProvider";

const StyledSalesChart = styled(DashboardBox)`
  grid-column: 1 / -1;

  & .recharts-cartesian-grid-horizontal line,
  & .recharts-cartesian-grid-vertical line {
    stroke: var(--color-grey-300);
  }
`;

/**
 * Renders a line chart component with customizable labels and data sets based on the provided parameters.
 *
 * @param {string} mainLabel - The main label for the chart.
 * @param {object} dataSet1 - The first data set object.
 * @param {object} dataSet2 - The second data set object.
 * @param {string} label1 - The label for dataSet1.
 * @param {string} label2 - The label for dataSet2.
 * @param {number} [numDays=30] - The number of days to consider for the chart.
 * @return {JSX.Element} A JSX element representing the rendered line chart component.
 */
function LineChart({
  mainLabel,
  dataSet1,
  dataSet2,
  label1,
  label2,
  numDays = 30,
}) {
  const { isDarkMode } = useDarkMode();
  const allDates = eachDayOfInterval({
    start: subDays(new Date(), numDays),
    end: new Date(),
  });

  const data = allDates.map((date) => {
    return {
      label: format(date, "MMM dd"),
      dataSet1: dataSet1.set
        .filter((el) =>
          isSameDay(date, new Date(el[`${dataSet1.dateForReducing}`]))
        )
        .reduce((acc, cur) => acc + cur.amount, 0),
      dataSet2: dataSet2.set
        .filter((el) =>
          isSameDay(date, new Date(el[`${dataSet2.dateForReducing}`]))
        )
        .reduce((acc, cur) => acc + cur.amount, 0),
    };
  });

  const colors = isDarkMode
    ? {
        dataSet1: { stroke: "#4f46e5", fill: "#4f46e5" },
        dataSet2: { stroke: "#22c55e", fill: "#22c55e" },
        text: "#e5e7eb",
        background: "#18212f",
      }
    : {
        dataSet1: { stroke: "#4f46e5", fill: "#c7d2fe" },
        dataSet2: { stroke: "#16a34a", fill: "#dcfce7" },
        text: "#374151",
        background: "#fff",
      };

  return (
    <StyledSalesChart>
      <Heading as="h2">
        {mainLabel} - from {format(allDates.at(0), "MMM dd yyyy")} to{" "}
        {format(allDates.at(-1), "MMM dd yyyy")}
      </Heading>
      <ResponsiveContainer height={300} width="100%">
        <AreaChart data={data}>
          <XAxis
            dataKey={"label"}
            tick={{ fill: colors.text }}
            tickLine={{ stroke: colors.text }}
          />
          <YAxis
            unit={"$"}
            tick={{ fill: colors.text }}
            tickLine={{ stroke: colors.text }}
          />
          <CartesianGrid strokeDasharray="4" />
          <Tooltip contentStyle={{ backgroundColor: colors.background }} />
          <Area
            dataKey="dataSet1"
            type="monotone"
            stroke={colors.dataSet1.stroke}
            fill={colors.dataSet1.fill}
            strokeWidth={2}
            name={label1}
            unit={"$"}
          />
          <Area
            dataKey="dataSet2"
            type="monotone"
            stroke={colors.dataSet2.stroke}
            fill={colors.dataSet2.fill}
            strokeWidth={2}
            name={label2}
            unit={"$"}
          />
        </AreaChart>
      </ResponsiveContainer>
    </StyledSalesChart>
  );
}

export default LineChart;
