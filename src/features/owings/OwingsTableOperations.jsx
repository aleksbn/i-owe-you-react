import Filter from "../../ui/Filter";
import SortBy from "../../ui/SortBy";
import TableOperations from "../../ui/TableOperations";

function OwingsTableOperations() {
	return (
		<TableOperations>
			<Filter
				filterField="status"
				options={[
					{ value: "all", label: "All" },
					{ value: "active", label: "Active" },
					{ value: "repayed", label: "Repayed" },
				]}
			/>

			<SortBy
				options={[
					{ value: "movementDate-desc", label: "Sort by date (newest first)" },
					{ value: "movementDate-asc", label: "Sort by date (oldest first)" },
					{ value: "amount-desc", label: "Sort by amount (bigger first)" },
					{ value: "amount-asc", label: "Sort by amount (smaller first)" },
				]}
			/>
		</TableOperations>
	);
}

export default OwingsTableOperations;
