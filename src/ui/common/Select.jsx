import styled, { css } from "styled-components";

// Object defining different types of styling for the select component
const types = {
  form: css`
    border-width: 1px;
    border-color: var(--color-grey-800);
    border-style: solid;
  `,
  details: css`
    border: none;
  `,
};

// Styled component for the Select
const Select = styled.select`
  width: 100%; /* Full width */
  font-size: 1.6rem; /* Font size */
  border-radius: var(--border-radius-sm); /* Border radius */
  text-align: center; /* Center text alignment */
  color: var(--color-grey-800); /* Text color */
  background-color: var(--color-grey-50); /* Background color */
  /* Applying type-specific styling based on props */
  ${(props) => types[props.type]}
`;

export default Select; // Exporting the Select component as default
