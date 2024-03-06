import OwingsTable from "../features/owings/OwingsTable";
import Heading from "../ui/Heading";
import Row from "../ui/Row";

function OwingsList() {
	return (
		<>
			<Row type="horizontal">
				<Heading as="h1">All the owings</Heading>
			</Row>

			<OwingsTable />
		</>
	);
}

export default OwingsList;
