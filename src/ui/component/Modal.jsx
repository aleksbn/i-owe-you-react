/* eslint-disable react/prop-types */ // Disabling prop-types linting rule
import { cloneElement, createContext, useContext, useState } from "react"; // Importing necessary dependencies from React
import styled from "styled-components"; // Importing styled-components for styling
import { useOutsideClick } from "../../hooks/useOutsideClick"; // Importing a custom hook for handling clicks outside a component
import { createPortal } from "react-dom"; // Importing createPortal from react-dom for rendering modals into a different DOM node
import { HiXMark } from "react-icons/hi2"; // Importing X mark icon from react-icons/hi2

// Styled component for the modal
const StyledModal = styled.div`
	position: fixed; /* Fixed position */
	top: 50%; /* Positioned at 50% from the top */
	left: 50%; /* Positioned at 50% from the left */
	transform: translate(-50%, -50%); /* Centering the modal */
	background-color: var(--color-grey-0); /* Background color */
	border-radius: var(--border-radius-lg); /* Border radius */
	box-shadow: var(--shadow-lg); /* Box shadow */
	padding: 3.2rem 4rem; /* Padding */
	transition: all 0.5s; /* Transition effect */
`;

// Styled component for the overlay
const Overlay = styled.div`
	position: fixed; /* Fixed position */
	top: 0; /* Positioned at the top */
	left: 0; /* Positioned at the left */
	width: 100%; /* Full width */
	height: 100%; /* Full height */
	background-color: var(--backdrop-color); /* Background color */
	backdrop-filter: blur(4px); /* Applying backdrop filter for blur effect */
	z-index: 1000; /* Z-index */
	transition: all 0.5s; /* Transition effect */
`;

// Styled component for the close button
const Button = styled.button`
	background: none; /* No background */
	border: none; /* No border */
	padding: 0.4rem; /* Padding */
	border-radius: var(--border-radius-sm); /* Border radius */
	transform: translateX(0.8rem); /* Translate X position */
	transition: all 0.2s; /* Transition effect */
	position: absolute; /* Absolute position */
	top: 1.2rem; /* Positioned 1.2rem from the top */
	right: 1.9rem; /* Positioned 1.9rem from the right */

	&:hover {
		background-color: var(--color-grey-100); /* Background color on hover */
	}

	& svg {
		width: 2.4rem; /* Icon width */
		height: 2.4rem; /* Icon height */
		color: var(--color-grey-500); /* Icon color */
	}
`;

// Context for managing modal state
const ModalContext = createContext();

// Modal component function
function Modal({ children }) {
	const [openName, setOpenName] = useState(); // State for tracking open modal window name

	const close = () => setOpenName(""); // Function to close modal window
	const open = setOpenName; // Function to open modal window

	return (
		<ModalContext.Provider value={{ openName, setOpenName, open, close }}>
			{children}
		</ModalContext.Provider>
	);
}

// Component for triggering modal opening
function Open({ opens: openWindowName, children }) {
	const { open } = useContext(ModalContext); // Accessing modal context
	return cloneElement(children, { onClick: () => open(openWindowName) }); // Cloning children and passing onClick handler to open modal
}

// Component for rendering modal window
function Window({ name, children }) {
	const { openName, close } = useContext(ModalContext); // Accessing modal context
	const ref = useOutsideClick(close); // Creating reference for detecting clicks outside the modal

	if (name !== openName) return null; // If the modal window name does not match the open modal name, return null

	return createPortal(
		// Render modal into a different DOM node
		<Overlay>
			<StyledModal ref={ref}>
				<Button onClick={close}>
					<HiXMark />
				</Button>
				<div>
					{cloneElement(children, {
						onClose: close,
					})}
				</div>
			</StyledModal>
		</Overlay>,
		document.body // Render into the document body
	);
}

// Assigning components to Modal object for export
Modal.Open = Open;
Modal.Window = Window;

export default Modal; // Exporting the Modal component
