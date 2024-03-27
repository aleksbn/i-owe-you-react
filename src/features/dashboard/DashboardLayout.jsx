import styled from "styled-components";
import Stats from "./Stats";
import TodayActivity from "./TodayActivity";
import Repayments from "./Repayments";
import Loans from "./Loans";
import { useOwings } from "../owings/useOwings";
import Spinner from "../../ui/Spinner";
import Payments from "./Payments";

const StyledDashboardLayout = styled.div`
	display: grid;
	grid-template-columns: 1fr 1fr 1fr 1fr;
	grid-template-rows: auto 34rem auto auto;
	gap: 2.4rem;
`;

function DashboardLayout() {
	const { owings, isLoading: isLoadingOwings } = useOwings("all");

	if (isLoadingOwings) return <Spinner />;

	return (
		<StyledDashboardLayout>
			<Stats owings={owings} />
			<TodayActivity />
			<Payments />
			<Loans />
			<Repayments />
		</StyledDashboardLayout>
	);
}

export default DashboardLayout;
