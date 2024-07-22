import styled from "styled-components";
import Header from "./Header";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";

// Styled component for the entire app layout
const StyledAppLayout = styled.div`
  height: 100vh;
  display: grid;
  grid-template-columns: 26rem 1fr; // Sidebar takes 26rem width, main content takes the rest
  grid-template-rows: auto 1fr; // Header takes auto height, main content takes the rest
`;

// Styled component for the main container
const StyledContainer = styled.main`
  max-width: 120rem; // Maximum width for the main content
  margin: 0 auto; // Center the main content horizontally
  display: flex;
  flex-direction: column;
  gap: 3.2rem; // Gap between child elements
`;

// Styled component for the main content area
const StyledMain = styled.main`
  background-color: var(
    --color-grey-50
  ); // Background color for the main content
  padding: 4rem 4.8rem 6.4rem; // Padding for the main content area
  overflow: auto; // Allow scrolling if content overflows
`;

/**
 * A function that renders the layout of the entire application.
 *
 * @return {JSX.Element} The JSX representation of the entire application layout.
 */
function AppLayout() {
  return (
    <StyledAppLayout>
      <Header />
      <StyledMain>
        <StyledContainer>
          <Outlet />
        </StyledContainer>
      </StyledMain>
      <Sidebar />
    </StyledAppLayout>
  );
}

export default AppLayout;
