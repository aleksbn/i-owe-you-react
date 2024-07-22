import styled, { css } from "styled-components";

// Styled component for a flexible row container
const Row = styled.div`
  display: flex; // Use flexbox for layout

  ${(props) =>
    props.type === "horizontal" &&
    css`
      justify-content: space-between; // Align items with space between them horizontally
      align-items: center; // Align items vertically
    `}

  ${(props) =>
    props.type === "vertical" &&
    css`
      flex-direction: column; // Change direction to column layout
      gap: 1.6rem; // Gap between child elements
    `}
`;

export default Row;
