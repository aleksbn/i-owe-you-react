import styled from "styled-components";
import UserAvatar from "../../features/authentication/UserAvatar";
import HeaderMenu from "./HeaderMenu";

// Styled component for the header
const StyledHeader = styled.header`
	background-color: var(--color-grey-0); // Background color for the header
	padding: 1.2rem 4.8rem; // Padding for the header
	border-bottom: 1px solid var(--color-grey-100); // Border at the bottom of the header
	display: flex; // Use flexbox for layout
	gap: 2.4rem; // Gap between child elements
	align-items: flex-end; // Align items at the bottom of the header
	justify-content: flex-end; // Justify content at the end of the header
`;

// Header component renders the application header
function Header() {
	return (
		<StyledHeader>
			<HeaderMenu />
			<UserAvatar />
		</StyledHeader>
	);
}

export default Header;
