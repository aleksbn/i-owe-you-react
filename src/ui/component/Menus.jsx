/* eslint-disable react/prop-types */ // Disabling prop-types linting rule
import { createContext, useContext, useState } from "react"; // Importing necessary dependencies from React
import styled from "styled-components"; // Importing styled-components for styling
import { useOutsideClick } from "../../hooks/useOutsideClick"; // Importing a custom hook for handling clicks outside a component
import { HiEllipsisVertical } from "react-icons/hi2"; // Importing vertical ellipsis icon from react-icons/hi2

// Styled component for the menu container
const Menu = styled.div`
	position: relative; /* Position relative for positioning children */
	display: flex; /* Display as flex */
	align-items: center; /* Align items vertically */
	justify-content: flex-end; /* Justify content to end */
`;

// Styled component for the toggle button
const StyledToggle = styled.button`
	background: none; /* No background */
	border: none; /* No border */
	padding: 0.4rem; /* Padding */
	border-radius: var(--border-radius-sm); /* Border radius */
	transform: translateX(0.8rem); /* Translate X position */
	transition: all 0.2s; /* Transition effect */

	&:hover {
		background-color: var(--color-grey-100); /* Background color on hover */
	}

	& svg {
		width: 2.4rem; /* Icon width */
		height: 2.4rem; /* Icon height */
		color: var(--color-grey-700); /* Icon color */
	}
`;

// Styled component for the list of options
const StyledList = styled.button`
	position: absolute; /* Position absolute */
	border: none; /* No border */
	z-index: 1; /* Z-index */
	background-color: var(--color-grey-0); /* Background color */
	box-shadow: var(--shadow-lg); /* Box shadow */
	border-radius: var(--border-radius-md); /* Border radius */
	right: ${(props) => props.position.x}px; /* Right position */
	top: ${(props) => props.position.y}px; /* Top position */
`;

// Styled component for a button within the menu
const StyledButton = styled.button`
	width: 100%; /* Full width */
	text-align: left; /* Text alignment */
	background: none; /* No background */
	border: none; /* No border */
	padding: 1.2rem 2.4rem; /* Padding */
	font-size: 1.4rem; /* Font size */
	transition: all 0.2s; /* Transition effect */
	white-space: nowrap; /* No wrapping */

	display: flex; /* Display as flex */
	align-items: center; /* Align items vertically */
	gap: 1.6rem; /* Gap between children */

	&:hover {
		background-color: var(--color-grey-100); /* Background color on hover */
	}

	& svg {
		width: 1.6rem; /* Icon width */
		height: 1.6rem; /* Icon height */
		color: var(--color-grey-400); /* Icon color */
		transition: all 0.3s; /* Transition effect */
	}
`;

// Context for managing menus
const MenusContext = createContext();

// Menus component function
function Menus({ children }) {
	const [openId, setOpenId] = useState(""); // State for tracking open menu ID
	const [position, setPosition] = useState(null); // State for positioning menu lists

	const close = () => setOpenId(""); // Function to close menu

	const open = setOpenId; // Function to open menu

	return (
		<MenusContext.Provider
			value={{ openId, setOpenId, position, setPosition, open, close }}
		>
			{children}
		</MenusContext.Provider>
	);
}

// Toggle component function
function Toggle({ id }) {
	const { openId, open, close, setPosition } = useContext(MenusContext); // Accessing context for managing menus

	function handleClick(e) {
		e.stopPropagation(); // Preventing event propagation
		const rect = e.target.closest("button").getBoundingClientRect(); // Getting button's bounding rectangle
		setPosition({
			x: -8,
			y: rect.height,
		}); // Setting position of the menu list
		openId === "" || openId !== id ? open(id) : close(); // Opening or closing menu based on its current state
	}

	return (
		<StyledToggle onClick={handleClick}>
			<HiEllipsisVertical /> {/* Vertical ellipsis icon */}
		</StyledToggle>
	);
}

// List component function
function List({ id, children }) {
	const { openId, setOpenId, position } = useContext(MenusContext); // Accessing context for managing menus

	function closeList() {
		setOpenId(""); // Closing the menu
	}

	const ref = useOutsideClick(closeList, false); // Reference for detecting clicks outside the menu list

	if (openId !== id) return null; // If the menu is not open, return null

	return (
		<StyledList ref={ref} position={{ ...position }}>
			{children} {/* Rendering menu options */}
		</StyledList>
	);
}

// Button component function
function Button({ children, icon, onClick }) {
	const { close } = useContext(MenusContext); // Accessing context for managing menus

	function handleClick() {
		onClick?.(); // Executing onClick function
		close(); // Closing the menu
	}

	return (
		<StyledButton onClick={handleClick}>
			{icon}
			<span>{children}</span>
		</StyledButton>
	);
}

// Assigning components to Menus object for export
Menus.Menu = Menu;
Menus.Toggle = Toggle;
Menus.List = List;
Menus.Button = Button;

export default Menus; // Exporting the Men
