/* eslint-disable react/prop-types */
import { useSearchParams } from "react-router-dom";
import Select from "./Select";

// eslint-disable-next-line react/prop-types
function SortBy({ options }) {
	const [searchParams, setSearchParams] = useSearchParams();
	const sortBy = searchParams.get("sortBy") || "";

	function handleChange(e) {
		searchParams.set("sortBy", e.target.value);
		setSearchParams(searchParams);
	}

	return (
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

export default SortBy;
