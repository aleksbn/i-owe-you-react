/* eslint-disable react/prop-types */ // Disabling prop-types linting rule
import styled from "styled-components";

// Styled component for the Checkbox
const StyledCheckbox = styled.div`
	display: flex; /* Display as flex container */
	gap: 1.6rem; /* Gap between child elements */

	& input[type="checkbox"] {
		height: 2.4rem; /* Checkbox height */
		width: 2.4rem; /* Checkbox width */
		outline-offset: 2px; /* Outline offset for accessibility */
		transform-origin: 0; /* Transform origin for animation */
		accent-color: var(
			--color-brand-600
		); /* Accent color (color of the checkbox itself) */
	}

	& input[type="checkbox"]:disabled {
		accent-color: var(--color-brand-600); /* Accent color for disabled state */
	}

	& label {
		flex: 1; /* Take remaining space */

		display: flex; /* Display as flex container */
		align-items: center; /* Align items vertically */
		gap: 0.8rem; /* Gap between child elements */
	}
`;

// Functional component for Checkbox
function Checkbox({ onChange, checked, disabled = false, id, children }) {
	return (
		<StyledCheckbox>
			<input
				type="checkbox"
				id={id}
				defaultChecked={checked}
				onChange={onChange}
				disabled={disabled}
			/>
			<label htmlFor={!disabled ? id : ""}>{children}</label>{" "}
			{/* Label for the checkbox */}
		</StyledCheckbox>
	);
}

export default Checkbox; // Exporting the Checkbox component as default
