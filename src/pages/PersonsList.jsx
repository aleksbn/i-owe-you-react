import PersonsTable from "../features/persons/PersonsTable";
import Heading from "../ui/Heading";
import Row from "../ui/Row";

function PersonsList() {
	return (
		<>
			<Row type="horizontal">
				<Heading as="h1">All the people</Heading>
			</Row>

			<PersonsTable />
		</>
	);
}

export default PersonsList;
