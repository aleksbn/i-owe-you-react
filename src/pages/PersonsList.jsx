import { useNavigate } from "react-router-dom";
import PersonsTable from "../features/persons/PersonsTable";
import Button from "../ui/common/Button";
import Heading from "../ui/style/Heading";
import Row from "../ui/layout/Row";
import SearchPerson from "../features/persons/SearchPerson";

function PersonsList() {
	const navigate = useNavigate();

	return (
		<>
			<Row type="horizontal">
				<Heading as="h1">All the people</Heading>
			</Row>
			<Row>
				<SearchPerson
					type="text"
					size="max"
					placeholder="Search by a nickname..."
				/>
			</Row>
			<Row>
				<PersonsTable />
			</Row>
			<Row>
				<Button
					size="medium"
					variation="primary"
					onClick={() => navigate("/people/new")}
				>
					Add a person
				</Button>
			</Row>
		</>
	);
}

export default PersonsList;
