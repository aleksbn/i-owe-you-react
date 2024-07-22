import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { HiOutlinePresentationChartLine, HiOutlineCash } from "react-icons/hi";
import { PiPerson } from "react-icons/pi";

// Styled component for the list of navigation items
const NavList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
`;

// Styled component for the navigation links
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

/**
 * Renders the main navigation menu.
 *
 * @return {JSX.Element} The main navigation menu as a JSX element.
 */
function MainNav() {
  return (
    <NavList>
      <li>
        <StyledNavLink to="owings">
          <HiOutlineCash />
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
  );
}

export default MainNav;
