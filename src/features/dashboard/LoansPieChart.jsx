/* eslint-disable react/prop-types */
import styled from "styled-components";
import Heading from "../../ui/Heading";
import {
	Cell,
	Legend,
	Pie,
	PieChart,
	ResponsiveContainer,
	Tooltip,
} from "recharts";

const ChartBox = styled.div`
	background-color: var(--color-grey-0);
	border: 1px solid var(--color-grey-100);
	border-radius: var(--border-radius-md);

	padding: 2.4rem 3.6rem;
	grid-column: 3 / span 2;

	& > *:first-child {
		margin-bottom: 1.6rem;
	}

	& .recharts-pie-label-text {
		font-weight: 600;
	}
`;

const startDataLight = [
	{
		direction: "Active loan ins",
		value: 0,
		color: "#ef4444",
	},
	{
		direction: "Active loan outs",
		value: 0,
		color: "#16cc3d",
	},
	{
		direction: "Already repayed",
		value: 0,
		color: "#14b8a6",
	},
];

// const startDataDark = [
// 	{
// 		direction: "Active loan ins",
// 		value: 0,
// 		color: "#b91c1c",
// 	},
// 	{
// 		direction: "Active loan outs",
// 		value: 0,
// 		color: "#16cc77",
// 	},
// 	{
// 		direction: "Already repayed",
// 		value: 0,
// 		color: "#0f766e",
// 	},
// ];

function prepareData(startData, allPayments, allOwings) {
	function incArrayValue(arr, field, value) {
		return arr.map((obj) =>
			obj.direction === field ? { ...obj, value: obj.value + value } : obj
		);
	}

	const alreadyRepayed = allPayments.reduce((acc, cur) => acc + cur.amount, 0);
	startData = incArrayValue(startData, "Already repayed", alreadyRepayed);

	const activeLoansIn =
		allOwings.reduce(
			(acc, cur) => (cur.amount > 0 ? acc + cur.amount : acc),
			0
		) -
		allPayments.reduce(
			(acc, cur) =>
				allOwings.find((owing) => owing.id === cur.owingId).amount < 0
					? acc + cur.amount
					: acc,
			0
		);

	startData = incArrayValue(startData, "Active loan ins", activeLoansIn);

	const activeLoansOut =
		allOwings.reduce(
			(acc, cur) => (cur.amount > 0 ? acc + cur.amount : acc),
			0
		) -
		allPayments.reduce(
			(acc, cur) =>
				allOwings.find((owing) => owing.id === cur.owingId).amount > 0
					? acc + cur.amount
					: acc,
			0
		);
	startData = incArrayValue(startData, "Active loan outs", activeLoansOut);

	return startData;
}

function LoansPieChart({ allPayments, allOwings }) {
	const startData = startDataLight;
	const data = prepareData(startData, allPayments, allOwings);
	return (
		<ChartBox>
			<Heading as="h2">Loans in numbers</Heading>
			<ResponsiveContainer width="100%" height={240}>
				<PieChart>
					<Pie
						data={data}
						dataKey="value"
						nameKey="direction"
						innerRadius={70}
						outerRadius={110}
						cx="40%"
						cy="50%"
						paddingAngle={3}
					>
						{data.map((entry) => (
							<Cell
								fill={entry.color}
								stroke={entry.color}
								key={entry.direction}
							/>
						))}
					</Pie>
					<Tooltip />
					<Legend
						verticalAlign="middle"
						align="right"
						width="40%"
						layout="vertical"
						iconSize={15}
						iconType="circle"
					/>
				</PieChart>
			</ResponsiveContainer>
		</ChartBox>
	);
}

export default LoansPieChart;
