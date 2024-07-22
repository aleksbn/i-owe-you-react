/* eslint-disable react/prop-types */ // Disabling prop-types linting rule
import styled from "styled-components";
import Heading from "../style/Heading"; // Importing a styled heading component
import Button from "../common/Button"; // Importing a button component

// Styled component for the confirm delete dialog
const StyledConfirmDelete = styled.div`
  width: 40rem; /* Width */
  display: flex; /* Display as flex */
  flex-direction: column; /* Flex direction */
  gap: 1.2rem; /* Gap between child elements */

  /* Styling for paragraph elements */
  & p {
    color: var(--color-grey-500); /* Text color */
    margin-bottom: 1.2rem; /* Bottom margin */
  }

  /* Styling for the container of buttons */
  & div {
    display: flex; /* Display as flex */
    justify-content: flex-end; /* Justify content to end */
    gap: 1.2rem; /* Gap between child elements */
  }
`;

/**
 * Renders a confirmation dialog for deleting a resource.
 *
 * @param {Object} props - The properties passed to the component.
 * @param {string} props.resourceName - The name of the resource to be deleted.
 * @param {function} props.onConfirm - The function to be called when the delete button is clicked.
 * @param {boolean} props.disabled - Indicates whether the delete button is disabled.
 * @param {function} props.onClose - The function to be called when the cancel button is clicked.
 * @param {string} [props.extraMessage=""] - An optional extra message to be displayed in the dialog.
 * @return {JSX.Element} The confirmation dialog component.
 */
function ConfirmDelete({
  resourceName,
  onConfirm,
  disabled,
  onClose,
  extraMessage = "",
}) {
  return (
    <StyledConfirmDelete>
      <Heading as="h3">Delete {resourceName}</Heading>
      <p>
        Are you sure you want to delete this {resourceName} permanently? This
        action cannot be undone.
      </p>
      {extraMessage && <p>{extraMessage}</p>}
      <div>
        <Button variation="secondary" disabled={disabled} onClick={onClose}>
          Cancel
        </Button>
        <Button variation="danger" disabled={disabled} onClick={onConfirm}>
          Delete
        </Button>
      </div>
    </StyledConfirmDelete>
  );
}

export default ConfirmDelete; // Exporting the ConfirmDelete component as default
