import styled from "styled-components";
import Row from "../../ui/layout/Row";
import TodayItem from "./TodayItem";
import { useToday } from "./useToday";
import Spinner from "../../ui/style/Spinner";
import Heading from "../../ui/style/Heading";

const StyledToday = styled.div`
	background-color: var(--color-grey-0);
	border: 1px solid var(--color-grey-100);
	border-radius: var(--border-radius-md);

	padding: 3.2rem;
	display: flex;
	flex-direction: column;
	gap: 2.4rem;
	grid-column: 1 / span 2;
	padding-top: 2.4rem;
`;

const TodayList = styled.ul`
	overflow: scroll;
	overflow-x: hidden;

	&::-webkit-scrollbar {
		width: 0 !important;
	}
	scrollbar-width: none;
	-ms-overflow-style: none;
`;

const NoActivity = styled.p`
	text-align: center;
	font-size: 1.8rem;
	font-weight: 500;
	margin-top: 0.8rem;
`;

function TodayActivity() {
	const { isLoadingToday, data } = useToday();

	return (
		<StyledToday>
			<Row>
				<Heading as="h2">Todays payments</Heading>
			</Row>
			<Row>
				{!isLoadingToday ? (
					data.activities?.length > 0 ? (
						<TodayList>
							{data.activities.map((fd) => (
								<TodayItem key={fd.id} activity={fd} />
							))}
						</TodayList>
					) : (
						<NoActivity>No activity today...</NoActivity>
					)
				) : (
					<Spinner />
				)}
			</Row>
		</StyledToday>
	);
}

export default TodayActivity;
