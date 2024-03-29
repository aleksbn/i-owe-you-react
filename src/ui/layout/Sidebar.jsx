import styled from "styled-components";
import Logo from "../style/Logo";
import MainNav from "../control/MainNav";
import Uploader from "../../data/Uploader";

// Styled component for the sidebar
const StyledSidebar = styled.aside`
	background-color: var(--color-grey-0); // Background color for the sidebar
	padding: 3.2rem 2.4rem; // Padding for the sidebar
	border-right: 1px solid var(--color-grey-100); // Border on the right side of the sidebar
	grid-row: 1 / -1; // Sidebar spans from the first to the last grid row
	display: flex; // Use flexbox for layout
	flex-direction: column; // Arrange child elements in a column
	gap: 3.2rem; // Gap between child elements
`;

// Sidebar component renders the sidebar layout with logo, navigation, and uploader
function Sidebar() {
	return (
		<StyledSidebar>
			<Logo />
			<MainNav />
			<Uploader />
		</StyledSidebar>
	);
}

export default Sidebar;
