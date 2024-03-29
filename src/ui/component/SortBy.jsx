/* eslint-disable react/prop-types */ // Disabling prop-types linting rule
import { useSearchParams } from "react-router-dom"; // Importing hook for accessing URL search parameters
import Select from "../common/Select"; // Importing Select component for dropdown

// SortBy component function
function SortBy({ options }) {
	const [searchParams, setSearchParams] = useSearchParams(); // Hook to access URL search parameters
	const sortBy = searchParams.get("sortBy") || ""; // Get the current "sortBy" parameter value or default to empty string

	// Function to handle change in select input
	function handleChange(e) {
		searchParams.set("sortBy", e.target.value); // Set "sortBy" parameter to selected value
		setSearchParams(searchParams); // Update URL search parameters
	}

	return (
		// Render Select component with onChange event handler, type, and value
		<Select onChange={handleChange} type="details" value={sortBy}>
			{options.map((option) => {
				return (
					<option value={option.value} key={option.value}>
						{option.label}
					</option>
				);
			})}
		</Select>
	);
}

export default SortBy; // Export SortBy component
