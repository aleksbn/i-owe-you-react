/* eslint-disable react/prop-types */
// Disables eslint warnings for missing prop types

import styled from "styled-components";

// Styled component for form row
const StyledFormRow = styled.div`
	// Styling for grid layout
	display: grid;
	align-items: center;
	grid-template-columns: 24rem 1fr 1.2fr;
	gap: 2.4rem;

	padding: 1.2rem 0;

	&:first-child {
		padding-top: 0;
	}

	&:last-child {
		padding-bottom: 0;
	}

	&:not(:last-child) {
		border-bottom: 1px solid var(--color-grey-100);
	}

	&:has(button) {
		display: flex;
		justify-content: flex-end;
		gap: 1.2rem;
	}
`;

// Styled component for label
const Label = styled.label`
	font-weight: 500;
`;

// Styled component for error message
const Error = styled.span`
	font-size: 1.4rem;
	color: var(--color-red-500);
`;

function getChildId(children) {
	return children && children.props && children.props.id;
}

// FormRow component renders a row in a form
function FormRow({ label, error = null, children }) {
	// Generate an id for child component if available
	const childId = getChildId(children);

	return (
		<StyledFormRow>
			{label && <Label htmlFor={childId}>{label}</Label>}
			{children}
			{error && <Error>{error}</Error>}
		</StyledFormRow>
	);
}

export default FormRow;
