import PersonsTable from "../features/persons/PersonsTable";
import { usePersons } from "../features/persons/usePersons";
import Heading from "../ui/Heading";
import Row from "../ui/Row";

function PersonsList() {
	const { isLoading, persons, count } = usePersons();
	if (!isLoading) console.log(persons, count);
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
