/* eslint-disable react/prop-types */ // Disabling prop-types linting rule
import { useNavigate } from "react-router-dom"; // Importing hook for navigation
import styled from "styled-components"; // Importing styled-components for styling
import { useUser } from "../../features/authentication/useUser"; // Importing custom hook for user authentication
import { useEffect } from "react"; // Importing useEffect hook for side effects
import Spinner from "../style/Spinner"; // Importing Spinner component

// Styled component for full page layout
const FullPage = styled.div`
  height: 100vh; /* Full viewport height */
  background-color: var(--color-grey-50); /* Background color */
  display: flex; /* Display flex */
  align-items: center; /* Align items center */
  justify-content: center; /* Justify content center */
`;

/**
 * Renders the given children if the user is authenticated, otherwise redirects to the login page.
 *
 * @param {Object} props - The component props.
 * @param {React.ReactNode} props.children - The children to render.
 * @return {React.ReactNode} The rendered component.
 */
function ProtectedRoute({ children }) {
  const navigate = useNavigate(); // Hook for navigation

  // Load authenticated user status using custom hook
  const { isLoading, isAuthenticated } = useUser();

  // Redirect to login page if not authenticated and not loading
  useEffect(() => {
    if (!isAuthenticated && !isLoading) {
      navigate("/login"); // Redirect to login page
    }
  }, [isAuthenticated, isLoading, navigate]); // Dependencies for useEffect

  // Show spinner while loading
  if (isLoading)
    return (
      <FullPage>
        <Spinner />
      </FullPage>
    );

  // Render children if authenticated
  if (isAuthenticated) return children;
}

export default ProtectedRoute; // Export ProtectedRoute component
