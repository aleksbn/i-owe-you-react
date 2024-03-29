import styled from "styled-components"; // Importing styled-components library

// Styled component for the login and registration layout
export const LoginRegisterLayout = styled.div`
	min-height: 100vh; /* Minimum height of the viewport */
	display: grid; /* Display as grid */
	grid-template-columns: 48rem; /* Grid template with one column of 48rem width */
	align-content: center; /* Align content vertically */
	justify-content: center; /* Justify content horizontally */
	gap: 3.2rem; /* Gap between grid items */
	background-color: var(--color-grey-50); /* Background color */
`;
