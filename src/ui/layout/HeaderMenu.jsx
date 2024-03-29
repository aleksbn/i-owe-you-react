import styled from "styled-components";
import ButtonIcon from "../common/ButtonIcon";
import { HiOutlineUser } from "react-icons/hi2";
import DarkModeToggle from "../component/DarkModeToggle";
import { useNavigate } from "react-router-dom";
import Logout from "../../features/authentication/Logout";

// Styled component for the header menu
const StyledHeaderMenu = styled.ul`
	display: flex; // Use flexbox for layout
	gap: 0.4rem; // Gap between child elements
	align-items: center; // Align items vertically
`;

// HeaderMenu component renders the menu items in the header
function HeaderMenu() {
	const navigate = useNavigate(); // Hook for navigating to different routes

	return (
		<StyledHeaderMenu>
			<li>
				<ButtonIcon onClick={() => navigate("/account")}>
					<HiOutlineUser />
				</ButtonIcon>
			</li>
			<li>
				<DarkModeToggle />
			</li>
			<li>
				<Logout />
			</li>
		</StyledHeaderMenu>
	);
}

export default HeaderMenu;
