import Empty from "../../ui/content/Empty";
import Menus from "../../ui/component/Menus";
import Pagination from "../../ui/component/Pagination";
import Spinner from "../../ui/style/Spinner";
import Table from "../../ui/common/Table";
import PersonRow from "./PersonRow";
import { usePersons } from "./usePersons";

function PersonsTable() {
	const { isLoading, persons, count } = usePersons();

	if (isLoading) return <Spinner />;

	if (!count) return <Empty resourceName="persons" />;

	return (
		<Menus>
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
				<Table.Footer>
					<Pagination count={count} />
				</Table.Footer>
			</Table>
		</Menus>
	);
}

export default PersonsTable;
