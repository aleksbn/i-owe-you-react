import Empty from "../../ui/Empty";
import Spinner from "../../ui/Spinner";
import Table from "../../ui/Table";
import PersonRow from "./PersonRow";
import { usePersons } from "./usePersons";

function PersonsTable() {
	const { isLoading, persons, count } = usePersons();

	if (isLoading) return <Spinner />;

	if (!count) return <Empty resourceName="persons" />;

	return (
		<Table columns="1.2fr 3fr 1.4fr 1.4fr 3.2rem">
			<Table.Header>
				<div>Image</div>
				<div>Full name</div>
				<div>Nickname</div>
				<div>Phone number</div>
				<div></div>
			</Table.Header>
			<Table.Body
				data={persons}
				render={(person) => <PersonRow key={person.id} person={person} />}
			></Table.Body>
		</Table>
	);
}

export default PersonsTable;
