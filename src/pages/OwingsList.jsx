import { useNavigate } from "react-router-dom";
import OwingsTable from "../features/owings/OwingsTable";
import Button from "../ui/common/Button";
import Heading from "../ui/style/Heading";
import Row from "../ui/layout/Row";
import OwingsTableOperations from "../features/owings/OwingsTableOperations";

/**
 * Renders the list of owings and provides functionality to add a new owing.
 *
 * @return {JSX.Element} The JSX element that represents the OwingsList component.
 */
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
