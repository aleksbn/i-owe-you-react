/* eslint-disable react/prop-types */
/* eslint-disable no-mixed-spaces-and-tabs */
import styled from "styled-components";
import DashboardBox from "./DashboardBox";
import Heading from "../../ui/Heading";
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

const StyledSalesChart = styled(DashboardBox)`
	grid-column: 1 / -1;

	& .recharts-cartesian-grid-horizontal line,
	& .recharts-cartesian-grid-vertical line {
		stroke: var(--color-grey-300);
	}
`;

function LoansLineChart({ owings, payments, label1, label2, numDays = 30 }) {
	const allDates = eachDayOfInterval({
		start: subDays(new Date(), numDays),
		end: new Date(),
	});

	const data = allDates.map((date) => {
		return {
			label: format(date, "MMM dd"),
			owings: owings
				.filter((owing) => isSameDay(date, new Date(owing.movementDate)))
				.reduce((acc, cur) => acc + cur.amount, 0),
			payments: payments
				.filter((payment) => isSameDay(date, new Date(payment.dateOfPayment)))
				.reduce((acc, cur) => acc + cur.amount, 0),
		};
	});

	const isDarkMode = false;
	const colors = isDarkMode
		? {
				owings: { stroke: "#4f46e5", fill: "#4f46e5" },
				payments: { stroke: "#22c55e", fill: "#22c55e" },
				text: "#e5e7eb",
				background: "#18212f",
		  }
		: {
				owings: { stroke: "#4f46e5", fill: "#c7d2fe" },
				payments: { stroke: "#16a34a", fill: "#dcfce7" },
				text: "#374151",
				background: "#fff",
		  };

	return (
		<StyledSalesChart>
			<Heading as="h2">
				From {format(allDates.at(0), "MMM dd yyyy")} to{" "}
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
						dataKey="owings"
						type="monotone"
						stroke={colors.owings.stroke}
						fill={colors.owings.fill}
						strokeWidth={2}
						name={label1}
						unit={"$"}
					/>
					<Area
						dataKey="payments"
						type="monotone"
						stroke={colors.payments.stroke}
						fill={colors.payments.fill}
						strokeWidth={2}
						name={label2}
						unit={"$"}
					/>
				</AreaChart>
			</ResponsiveContainer>
		</StyledSalesChart>
	);
}

export default LoansLineChart;
