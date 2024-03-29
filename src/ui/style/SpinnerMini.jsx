import styled, { keyframes } from "styled-components";
import { BiLoaderAlt } from "react-icons/bi";

// Define a keyframe animation for rotation
const rotate = keyframes`
  to {
    transform: rotate(1turn); // Rotate by 360 degrees
  }
`;

// Styled component for the mini spinner using react-icons
const SpinnerMini = styled(BiLoaderAlt)`
	width: 2.4rem; // Set width for the mini spinner
	height: 2.4rem; // Set height for the mini spinner
	animation: ${rotate} 1.5s infinite linear; // Apply rotation animation to the mini spinner
`;

export default SpinnerMini;
