import DashboardFilter from "../features/dashboard/DashboardFilter";
import DashboardLayout from "../features/dashboard/DashboardLayout";
import Heading from "../ui/style/Heading";
import Row from "../ui/layout/Row";

function Dashboard() {
	return (
		<>
			<Row type="horizontal">
				<Heading as="h1">Dashboard</Heading>
				<DashboardFilter />
			</Row>
			<DashboardLayout />
		</>
	);
}

export default Dashboard;
