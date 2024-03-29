/* eslint-disable react/prop-types */ // Disabling prop-types linting rule
import { useSearchParams } from "react-router-dom"; // Importing useSearchParams hook from react-router-dom
import styled, { css } from "styled-components"; // Importing styled-components

// Styled component for the filter container
const StyledFilter = styled.div`
	border: 1px solid var(--color-grey-100); /* Border */
	background-color: var() (--color-grey-0); /* Background color */
	box-shadow: var(--shadow-sm); /* Box shadow */
	border-radius: var(--border-radius-sm); /* Border radius */
	padding: 0.4rem; /* Padding */
	display: flex; /* Display as flex */
	gap: 0.4rem; /* Gap between child elements */
`;

// Styled component for filter buttons
const FilterButton = styled.button`
	background-color: var(--color-grey-0); /* Background color */
	border: none; /* No border */

	${(props) =>
		props.active &&
		css`
			background-color: var(
				--color-brand-600
			); /* Background color for active state */
			color: var(--color-brand-50); /* Text color for active state */
		`}

	border-radius: var(--border-radius-sm); /* Border radius */
	font-weight: 500; /* Font weight */
	font-size: 1.4rem; /* Font size */
	padding: 0.44rem 0.8rem; /* Padding */
	transition: all 0.3s; /* Transition effect */

	&:hover:not(:disabled) {
		background-color: var(--color-brand-600); /* Background color on hover */
		color: var(--color-brand-50); /* Text color on hover */
	}
`;

// Filter component function
function Filter({ filterField, options }) {
	const [searchParams, setSearchParams] = useSearchParams(); // Using useSearchParams hook to manage URL search parameters

	const currentFilter = searchParams.get(filterField) || options[0].value; // Current selected filter value

	// Function to handle filter button click
	function handleClick(value) {
		searchParams.set(filterField, value); // Set filter value in search parameters
		if (searchParams.get("page")) searchParams.set("page", "1"); // Reset page to 1 if page parameter exists
		setSearchParams(searchParams); // Update search parameters
	}

	return (
		<StyledFilter>
			{options.map((option) => (
				<FilterButton
					key={option.value}
					onClick={() => handleClick(option.value)}
					active={currentFilter === option.value}
					disabled={currentFilter === option.value}
				>
					{option.label}
				</FilterButton>
			))}
		</StyledFilter>
	);
}

export default Filter; // Exporting the Filter component as default
