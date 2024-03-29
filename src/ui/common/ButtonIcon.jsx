// Importing necessary module from styled-components.
import styled from "styled-components";

// Styled component for the ButtonIcon with dynamic CSS.
const ButtonIcon = styled.button`
	background: none; /* No background */
	border: none; /* No border */
	padding: 0%.6rem; /* Padding */
	border-radius: var(--border-radius-sm); /* Border radius */
	transition: all 0.3s; /* Transition effect for smooth hover */

	&:hover {
		background-color: var(--color-grey-100); /* Background color on hover */
	}

	& svg {
		height: 2.2rem; /* Icon height */
		width: 2.2rem; /* Icon width */
		color: var(--color-brand-600); /* Icon color */
	}
`;

export default ButtonIcon; // Exporting the ButtonIcon component as default.
