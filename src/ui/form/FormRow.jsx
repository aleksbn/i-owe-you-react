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
 * Renders a row in a form with an optional label, children, and error message.
 *
 * @param {Object} props - The props object containing the following properties:
 *   - label {string} (optional): The label for the row.
 *   - error {string|null} (optional): The error message for the row. Defaults to null.
 *   - children {ReactNode} (optional): The child components to render in the row.
 * @return {JSX.Element} The rendered FormRow component.
 */
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
