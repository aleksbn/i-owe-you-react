import { NavLink } from "react-router-dom";
import styled from "styled-components";

// Styled component for the logo container
const StyledLogo = styled.div`
  text-align: center; // Center align the logo
`;

// Styled component for the logo image
const Img = styled.img`
  height: 9.6rem; // Set height for the logo
  width: auto; // Automatically adjust width to maintain aspect ratio
`;

/**
 * Renders the logo image as a clickable link to the welcome page.
 *
 * @return {JSX.Element} The logo component wrapped in a styled container.
 */
function Logo() {
  const src = "/logo.png"; // Image source
  return (
    <StyledLogo>
      <NavLink to="/welcome">
        <Img src={src} alt="logo" />
      </NavLink>
    </StyledLogo>
  );
}

export default Logo;
