import styled, { keyframes } from "styled-components";

// Define a keyframe animation for rotation
const rotate = keyframes`
  to {
    transform: rotate(1turn); // Rotate by 360 degrees
  }
`;

// Styled component for the spinner
const Spinner = styled.div`
	margin: 4.8rem auto; // Set margin for centering the spinner horizontally

	width: 6.4rem; // Set width for the spinner
	aspect-ratio: 1; // Maintain aspect ratio (width:height = 1:1)
	border-radius: 50%; // Make the spinner a circle
	background: 
		/* Background gradient for the spinner */ radial-gradient(
				farthest-side,
				var(--color-brand-600) 94%,
				#0000
			)
			top/10px 10px no-repeat,
		conic-gradient(#0000 30%, var(--color-brand-600)); // Radial and conic gradients for spinner appearance
	-webkit-mask: radial-gradient(
		farthest-side,
		#0000 calc(100% - 10px),
		#000 0
	); // Mask to hide overflowed part of the spinner
	animation: ${rotate} 1.5s infinite linear; // Apply rotation animation to the spinner
`;

export default Spinner;
