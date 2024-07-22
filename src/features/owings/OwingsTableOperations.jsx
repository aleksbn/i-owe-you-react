import Filter from "../../ui/component/Filter";
import SortBy from "../../ui/component/SortBy";
import TableOperations from "../../ui/component/TableOperations";

/**
 * Renders the OwingsTableOperations component, which includes a TableOperations
 * component and two child components: Filter and SortBy.
 *
 * @return {JSX.Element} The rendered OwingsTableOperations component.
 */
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
