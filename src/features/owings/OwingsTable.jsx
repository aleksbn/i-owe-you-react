import Empty from "../../ui/Empty";
import Spinner from "../../ui/Spinner";
import Table from "../../ui/Table";
import OwingsRow from "./OwingsRow";
import { useOwings } from "./useOwings";

function OwingsTable() {
	const { isLoading, owings, count } = useOwings();

	if (isLoading) return <Spinner />;
	else console.log(owings);

	if (!count) return <Empty resourceName="owings" />;

	return (
		<Table columns="1fr 1.4fr 2fr 1fr 3.2fr 1fr 3.2rem">
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
				render={(owing) => <OwingsRow key={owing.id} owing={owing} />}
			></Table.Body>
		</Table>
	);
}

export default OwingsTable;
