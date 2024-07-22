import styled from "styled-components";

// Styled component for the FileInput
const FileInput = styled.input.attrs({ type: "file" })`
  font-size: 1.4rem; /* Font size */
  border-radius: var(--border-radius-sm); /* Border radius */

  /* Styling for the file selector button */
  &::file-selector-button {
    font: inherit; /* Inherit font */
    font-weight: 500; /* Font weight */
    padding: 0.8rem 1.2rem; /* Padding */
    margin-right: 1.2rem; /* Margin right */
    border-radius: var(--border-radius-sm); /* Border radius */
    border: none; /* No border */
    color: var(--color-brand-50); /* Text color */
    background-color: var(--color-brand-600); /* Background color */
    cursor: pointer; /* Cursor style */
    transition: color 0.2s, background-color 0.2s; /* Transition effect */

    &:hover {
      background-color: var(--color-brand-700); /* Background color on hover */
    }
  }
`;

export default FileInput; // Exporting the FileInput component as default
