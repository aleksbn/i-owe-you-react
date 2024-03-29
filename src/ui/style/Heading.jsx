import styled, { css } from "styled-components";

// Styled component for headings with dynamic styles based on the "as" prop
const Heading = styled.h1`
	${(props) =>
		props.as === "h1" &&
		css`
			font-size: 3rem; // Set font size for h1
			font-weight: 600; // Set font weight for h1
		`}

	${(props) =>
		props.as === "h2" &&
		css`
			font-size: 2rem; // Set font size for h2
			font-weight: 600; // Set font weight for h2
		`}

  ${(props) =>
		props.as === "h3" &&
		css`
			font-size: 2rem; // Set font size for h3
			font-weight: 500; // Set font weight for h3
		`}

  ${(props) =>
		props.as === "h4" &&
		css`
			font-size: 3rem; // Set font size for h4
			font-weight: 600; // Set font weight for h4
			text-align: center; // Center align h4
		`}

  line-height: 1.4rem; // Set line height for all headings
`;

export default Heading;
