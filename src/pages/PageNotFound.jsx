import styled from "styled-components";

const StyledPageNotFount = styled.main`
  height: 100vh;
  background-color: var(--color-grey-50);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4.8rem;
`;

/**
 * Renders a component that displays "PAGE NOT FOUND" message.
 *
 * @return {JSX.Element} The component to be rendered.
 */
function PageNotFound() {
  return <StyledPageNotFount>PAGE NOT FOUND</StyledPageNotFount>;
}

export default PageNotFound;
