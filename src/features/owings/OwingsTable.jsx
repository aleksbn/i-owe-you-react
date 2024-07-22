import { useUserData } from "../../context/UserDataProvider";
import Empty from "../../ui/content/Empty";
import Menus from "../../ui/component/Menus";
import Pagination from "../../ui/component/Pagination";
import Spinner from "../../ui/style/Spinner";
import Table from "../../ui/common/Table";
import OwingsRow from "./OwingsRow";
import { useOwings } from "./useOwings";

/**
 * Renders the OwingsTable component with user data, owings data, and pagination.
 *
 * @return {JSX.Element} The rendered OwingsTable component.
 */
function OwingsTable() {
  const { userData } = useUserData();
  const { isLoading, owings, count } = useOwings();

  if (isLoading) return <Spinner />;

  if (!count) return <Empty resourceName="owings" />;

  return (
    <Menus>
      <Table columns="1.1fr 1.4fr 2fr 1fr 3.2fr 1fr 3.2rem">
        <Table.Header>
          <div>Date</div>
          <div>Amount</div>
          <div>Nickname</div>
          <div>Image</div>
          <div>Status</div>
          <div>Owes</div>
          <div></div>
        </Table.Header>
        <Table.Body
          data={owings}
          render={(owing) => (
            <OwingsRow key={owing.id} owing={owing} userData={userData} />
          )}
        ></Table.Body>
        <Table.Footer>
          <Pagination count={count} />
        </Table.Footer>
      </Table>
    </Menus>
  );
}

export default OwingsTable;
