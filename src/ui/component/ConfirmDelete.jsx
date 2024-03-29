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

// ConfirmDelete component function
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
