/* eslint-disable react/prop-types */
// Disables eslint warnings for missing prop types

import styled from "styled-components";

// Styled component for form row with vertical layout
const StyledFormRow = styled.div`
	display: flex;
	flex-direction: column;
	gap: 0.8rem;
	padding: 1.2rem 0;
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

// FormRowVertical component renders a form row with vertical layout
function FormRowVertical({ label, error, children }) {
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

export default FormRowVertical;
