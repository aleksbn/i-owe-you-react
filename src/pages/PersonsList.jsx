import { useNavigate } from "react-router-dom";
import PersonsTable from "../features/persons/PersonsTable";
import Button from "../ui/Button";
import Heading from "../ui/Heading";
import Row from "../ui/Row";

function PersonsList() {
	const navigate = useNavigate();

	return (
		<>
			<Row type="horizontal">
				<Heading as="h1">All the people</Heading>
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
