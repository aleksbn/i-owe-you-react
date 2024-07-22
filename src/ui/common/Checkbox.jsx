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

/**
 * Renders a Checkbox component with the provided props.
 *
 * @param {Object} props - The props object containing the following properties:
 *   - onChange: A function to be called when the checkbox value changes.
 *   - checked: A boolean indicating whether the checkbox is checked or not.
 *   - disabled: A boolean indicating whether the checkbox is disabled or not. Defaults to false.
 *   - id: A string representing the id of the checkbox.
 *   - children: The content to be displayed inside the label of the checkbox.
 * @return {JSX.Element} The rendered Checkbox component.
 */
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
