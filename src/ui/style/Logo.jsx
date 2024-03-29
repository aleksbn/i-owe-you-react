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

// Logo component renders the logo image
function Logo() {
	const src = "/logo.png"; // Image source
	return (
		<StyledLogo>
			<a href="/welcome">
				<Img src={src} alt="logo" />
			</a>
		</StyledLogo>
	);
}

export default Logo;
