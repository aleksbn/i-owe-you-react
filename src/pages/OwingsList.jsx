import { useNavigate } from "react-router-dom";
import OwingsTable from "../features/owings/OwingsTable";
import Button from "../ui/Button";
import Heading from "../ui/Heading";
import Row from "../ui/Row";
import OwingsTableOperations from "../features/owings/OwingsTableOperations";

function OwingsList() {
	const navigate = useNavigate();

	return (
		<>
			<Row type="horizontal">
				<Heading as="h1">All the owings</Heading>
				<OwingsTableOperations />
			</Row>
			<Row>
				<OwingsTable />
			</Row>
			<Row>
				<Button
					size="medium"
					variation="primary"
					onClick={() => navigate("/owings/new")}
				>
					Add the owing
				</Button>
			</Row>
		</>
	);
}

export default OwingsList;
