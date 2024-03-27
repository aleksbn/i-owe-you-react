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

function PieChartBox({ data, heading }) {
	if (data.every((set) => set.value == 0))
		return (
			<ChartBox>
				<Heading as="h2">{`${heading}`}</Heading>
				<div>Nothing to display for this period.</div>
			</ChartBox>
		);
	return (
		<ChartBox>
			<Heading as="h2">{`${heading}`}</Heading>
			<ResponsiveContainer width="100%" height={240}>
				<PieChart>
					<Pie
						data={data}
						dataKey="value"
						nameKey="label"
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
						width="45%"
						layout="vertical"
						iconSize={15}
						iconType="circle"
					/>
				</PieChart>
			</ResponsiveContainer>
		</ChartBox>
	);
}

export default PieChartBox;
