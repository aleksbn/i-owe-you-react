import styled from "styled-components";
import Stats from "./Stats";
import TodayActivity from "./TodayActivity";
import LoansToMe from "./LoansToMe";
import LoansToOthers from "./LoansToOthers";
import { useOwings } from "../owings/useOwings";
import Spinner from "../../ui/Spinner";
import LoansPieChart from "./LoansPieChart";
import { usePayments } from "../payments/usePayments";

const StyledDashboardLayout = styled.div`
	display: grid;
	grid-template-columns: 1fr 1fr 1fr 1fr;
	grid-template-rows: auto 34rem auto auto;
	gap: 2.4rem;
`;

function DashboardLayout() {
	const { owings, isLoading: isLoadingOwings } = useOwings("all");
	const { payments, isLoading: isLoadingPayments } = usePayments("all");

	if (isLoadingOwings || isLoadingPayments) return <Spinner />;

	return (
		<StyledDashboardLayout>
			<Stats owings={owings} />
			<TodayActivity />
			<LoansPieChart allOwings={owings} allPayments={payments} />
			<LoansToMe />
			<LoansToOthers />
		</StyledDashboardLayout>
	);
}

export default DashboardLayout;
