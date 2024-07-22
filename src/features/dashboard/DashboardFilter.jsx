import Filter from "../../ui/component/Filter";

/**
 * Renders a filter component for the dashboard with options for different time periods.
 *
 * @return {JSX.Element} The rendered filter component.
 */
function DashboardFilter() {
  return (
    <Filter
      filterField="last"
      options={[
        { value: "7", label: "Last 7 days" },
        { value: "30", label: "Last 30 days" },
        { value: "90", label: "Last 90 days" },
        { value: "365", label: "Last year" },
      ]}
    />
  );
}

export default DashboardFilter;
