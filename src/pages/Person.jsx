import { useNavigate, useParams } from "react-router-dom";
import { usePerson } from "../features/persons/usePerson";
import PersonDetails from "../features/persons/PersonDetails";
import Spinner from "../ui/style/Spinner";
import Empty from "../ui/content/Empty";

/**
 * Renders the Person component.
 *
 * @return {JSX.Element} The rendered component.
 */
function Person() {
  const { personId } = useParams();
  const navigate = useNavigate();

  const { isLoading, person, error } = usePerson(
    personId !== "new" ? personId : 0
  );

  /**
   * Navigates to the "/people" route.
   *
   * @return {void}
   */
  function handleClose() {
    navigate("/people");
  }

  if (isLoading) return <Spinner />;

  if (!isLoading && personId === "new")
    return <PersonDetails onClose={handleClose} />;

  if (!isLoading && personId !== "new" && error)
    return <Empty resourceName="person under that ID" />;

  return <PersonDetails onClose={handleClose} personToUpdate={person} />;
}

export default Person;
