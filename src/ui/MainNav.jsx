import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { HiOutlinePresentationChartLine } from "react-icons/hi";
import { HiOutlineBanknotes } from "react-icons/hi2";
import { PiPerson } from "react-icons/pi";

const NavList = styled.ul`
	display: flex;
	flex-direction: column;
	gap: 0.8rem;
`;

const StyledNavLink = styled(NavLink)`
	&:link,
	&:visited {
		display: flex;
		align-items: center;
		gap: 1.2rem;

		color: var(--color-grey-500);
		font-size: 1.6rem;
		font-weight: 600;
		padding: 1.2rem 2.4rem;
		transition: all 0.3s;
	}

	&:hover,
	&:active,
	&.active:link,
	&.active:visited {
		color: var(--color-grey-800);
		background-color: var(--color-grey-50);
		border-radius: var(--border-radius-sm);
	}

	& svg {
		width: 2.4rem;
		height: 2.4rem;
		color: var(--color-grey-400);
		transition: all 0.3s;
	}

	&:hover svg,
	&:active svg,
	&.active:link svg,
	&.active:visited svg {
		color: var(--color-brand-600);
	}
`;

function MainNav() {
	return (
		<nav>
			<NavList>
				<li>
					<StyledNavLink to="owings">
						<HiOutlineBanknotes />
						<span>Owings</span>
					</StyledNavLink>
				</li>
				<li>
					<StyledNavLink to="people">
						<PiPerson />
						<span>People</span>
					</StyledNavLink>
				</li>
				<li>
					<StyledNavLink to="dashboard">
						<HiOutlinePresentationChartLine />
						<span>Dashboard</span>
					</StyledNavLink>
				</li>
			</NavList>
		</nav>
	);
}

export default MainNav;
