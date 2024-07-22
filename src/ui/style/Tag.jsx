import styled from "styled-components";

// Styled component for tags
const Tag = styled.span`
  width: fit-content; // Set width to fit the content
  text-transform: uppercase; // Convert text to uppercase
  font-size: 1.1rem; // Set font size
  font-weight: 600; // Set font weight
  padding: 0.4rem 1.2rem; // Set padding
  border-radius: 100px; // Set border radius for rounded corners

  /* Make these dynamic, based on the received prop */
  color: var(
    --color-${(props) => props.type}-700
  ); // Set text color based on type prop
  background-color: var(
    --color-${(props) => props.type}-100
  ); // Set background color based on type prop
`;

export default Tag;
