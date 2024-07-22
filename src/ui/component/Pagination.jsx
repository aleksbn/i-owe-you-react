/* eslint-disable react/prop-types */ // Disabling prop-types linting rule
import { useSearchParams } from "react-router-dom"; // Importing hook for accessing URL parameters
import styled from "styled-components"; // Importing styled-components for styling
import { PAGE_SIZE } from "../../utilities/constants"; // Importing constant for page size
import { HiChevronLeft, HiChevronRight } from "react-icons/hi2"; // Importing left and right chevron icons from react-icons/hi2

// Styled component for the pagination container
const StyledPagination = styled.div`
  width: 100%; /* Full width */
  display: flex; /* Display flex */
  align-items: center; /* Align items center */
  justify-content: space-between; /* Justify content space between */
`;

// Styled component for paragraphs within pagination
const P = styled.p`
  font-size: 1.4rem; /* Font size */
  margin-left: 0.8rem; /* Left margin */

  & span {
    font-weight: 600; /* Bold font weight */
  }
`;

// Styled component for pagination buttons container
const Buttons = styled.div`
  display: flex; /* Display flex */
  gap: 0.6rem; /* Gap between buttons */
`;

// Styled component for individual pagination button
const PaginationButton = styled.button`
  background-color: ${(props) =>
    props.active
      ? " var(--color-brand-600)"
      : "var(--color-grey-50)"}; /* Background color based on active state */
  color: ${(props) =>
    props.active
      ? " var(--color-brand-50)"
      : "inherit"}; /* Text color based on active state */
  border: none; /* No border */
  border-radius: var(--border-radius-sm); /* Border radius */
  font-weight: 500; /* Font weight */
  font-size: 1.4rem; /* Font size */

  display: flex; /* Display flex */
  align-items: center; /* Align items center */
  justify-content: center; /* Justify content center */
  gap: 0.4rem; /* Gap between icon and text */
  padding: 0.6rem 1.2rem; /* Padding */
  transition: all 0.3s; /* Transition effect */

  &:has(span:last-child) {
    padding-left: 0.4rem; /* Left padding if last child */
  }

  &:has(span:first-child) {
    padding-right: 0.4rem; /* Right padding if first child */
  }

  & svg {
    height: 1.8rem; /* Icon height */
    width: 1.8rem; /* Icon width */
  }

  &:hover:not(:disabled) {
    background-color: var(--color-brand-600); /* Background color on hover */
    color: var(--color-brand-50); /* Text color on hover */
  }
`;

/**
 * Renders a pagination component based on the total count of items.
 *
 * @param {Object} props - The properties passed to the component.
 * @param {number} props.count - The total count of items.
 * @return {JSX.Element|null} The pagination component or null if the total count is less than or equal to the page size.
 */
function Pagination({ count }) {
  const [searchParams, setSearchParams] = useSearchParams(); // Hook for accessing URL search parameters
  const currentPage = !searchParams.get("page") ? 1 : +searchParams.get("page"); // Current page number from URL parameter
  const pageCount = Math.ceil(count / PAGE_SIZE); // Total number of pages

  /**
   * Next page logic to increment the current page number and update URL parameters.
   *
   * @param {void}
   * @return {void}
   */
  function nextPage() {
    const next = currentPage === pageCount ? pageCount : currentPage + 1; // Next page number
    searchParams.set("page", next); // Set next page number in URL parameter
    setSearchParams(searchParams); // Update URL parameters
  }

  /**
   * Navigates to the previous page by updating the URL parameter "page".
   *
   * @return {void} This function does not return anything.
   */
  function previousPage() {
    const previous = currentPage === 1 ? 1 : currentPage - 1; // Previous page number
    searchParams.set("page", previous); // Set previous page number in URL parameter
    setSearchParams(searchParams); // Update URL parameters
  }

  return (
    count > PAGE_SIZE && ( // Render pagination if total count is greater than page size
      <StyledPagination>
        <P>
          Showing <span>{(currentPage - 1) * PAGE_SIZE + 1}</span> to{" "}
          <span>
            {currentPage * PAGE_SIZE > count ? count : currentPage * PAGE_SIZE}
          </span>{" "}
          of <span>{count}</span> results
        </P>
        <Buttons>
          <PaginationButton onClick={previousPage} disabled={currentPage === 1}>
            <HiChevronLeft />
          </PaginationButton>
          <PaginationButton
            onClick={nextPage}
            disabled={currentPage === pageCount}
          >
            <HiChevronRight />
          </PaginationButton>
        </Buttons>
      </StyledPagination>
    )
  );
}

export default Pagination; // Exporting the Pagination component
