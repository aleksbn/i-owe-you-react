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

/**
 * Returns the id of the child component if available.
 *
 * @param {any} children - The child component to extract the id from.
 * @return {string} The id of the child component, or undefined if not available.
 */
function getChildId(children) {
  return children && children.props && children.props.id;
}

/**
 * Renders a form row with a vertical layout.
 *
 * @param {Object} props - The properties for the form row.
 * @param {string} props.label - The label for the form row.
 * @param {string} props.error - The error message for the form row.
 * @param {ReactNode} props.children - The child components for the form row.
 * @return {ReactElement} The rendered form row.
 */
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
