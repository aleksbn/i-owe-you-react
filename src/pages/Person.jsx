import { useNavigate, useParams } from "react-router-dom";
import { usePerson } from "../features/persons/usePerson";
import PersonDetails from "../features/persons/PersonDetails";
import Spinner from "../ui/Spinner";
import Empty from "../ui/Empty";

function Person() {
	const { personId } = useParams();
	const navigate = useNavigate();

	const { isLoading, person, error } = usePerson(
		personId !== "new" ? personId : 0
	);

	function handleClose() {
		navigate("/people");
	}

	if (!personId) return <PersonDetails onClose={handleClose} />;

	if (isLoading) return <Spinner />;

	if (!isLoading && personId !== undefined && error)
		return <Empty resourceName="person under that ID" />;

	return <PersonDetails onClose={handleClose} personToUpdate={person} />;
}

export default Person;
