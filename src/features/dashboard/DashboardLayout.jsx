import styled from "styled-components";
import Stats from "./Stats";
import TodayActivity from "./TodayActivity";
import Loans from "./Loans";
import { useOwings } from "../owings/useOwings";
import Spinner from "../../ui/style/Spinner";
import PaymentsPieChart from "./PaymentsPieChart";
import Payments from "./Payments";

const StyledDashboardLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: auto 34rem auto auto;
  gap: 2.4rem;
`;

/**
 * Renders the layout for the dashboard.
 *
 * @return {JSX.Element} The rendered dashboard layout.
 */
function DashboardLayout() {
  const { owings, isLoading: isLoadingOwings } = useOwings("all");

  if (isLoadingOwings) return <Spinner />;

  return (
    <StyledDashboardLayout>
      <Stats owings={owings} />
      <TodayActivity />
      <PaymentsPieChart />
      <Loans />
      <Payments />
    </StyledDashboardLayout>
  );
}

export default DashboardLayout;
