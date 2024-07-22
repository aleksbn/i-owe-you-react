/* eslint-disable react/prop-types */ // Disabling prop-types linting rule
import { createContext, useContext } from "react";
import styled from "styled-components";

// Styled component for the entire table
const StyledTable = styled.div`
  border-radius: 7px; /* Border radius */
  border: 1px solid var(--color-grey-200); /* Border */
  font-size: 1.4rem; /* Font size */
  background-color: var(--color-grey-0); /* Background color */
  width: 100%; /* Table width */
`;

// Common styled row component for header and body rows
const CommonRow = styled.div`
  display: grid; /* Display as grid */
  grid-template-columns: ${(props) => props.columns}; /* Column template */
  column-gap: 2.4rem; /* Gap between columns */
  align-items: center; /* Align items */
  transition: none; /* No transition */
`;

// Styled component for table header row
const StyledHeader = styled(CommonRow)`
  padding: 1.6rem 2.4rem; /* Padding */
  background-color: var(--color-grey-50); /* Background color */
  border-bottom: 1px solid var(--color-grey-100); /* Bottom border */
  text-transform: uppercase; /* Uppercase text */
  letter-spacing: 0.4rem; /* Letter spacing */
  font-weight: 600; /* Font weight */
  color: var(--color-grey-600); /* Text color */
`;

// Styled components for different colored rows
const StyledRow = styled(CommonRow)`
  padding: 1.2rem 2.4rem; /* Padding */

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100); /* Bottom border for rows */
  }
`;

const StyledRowGreen = styled(StyledRow)`
  background-color: var(
    --color-green-300
  ); /* Background color for green rows */
`;

const StyledRowRed = styled(StyledRow)`
  background-color: var(--color-red-300); /* Background color for red rows */
`;

const StyledRowGrey = styled(StyledRow)`
  background-color: var(--color-grey-300); /* Background color for grey rows */
`;

// Styled component for table body section
const StyledBody = styled.section`
  margin: 0%.4rem 0; /* Margin */
`;

// Styled component for table footer
const Footer = styled.footer`
  background-color: var(--color-grey-50); /* Background color */
  display: flex; /* Display as flex */
  justify-content: flex-end; /* Justify content to end */
  padding: 1.2rem; /* Padding */

  &:not(:has(*)) {
    display: none; /* Hide footer if it has no content */
  }
`;

// Styled component for empty table message
const Empty = styled.p`
  font-size: 1.6rem; /* Font size */
  font-weight: 500; /* Font weight */
  text-align: center; /* Text alignment */
  margin: 2.4rem; /* Margin */
`;

// Creating a context for the table columns
const TableContext = createContext();

/**
 * Renders a table component with provided columns and children.
 *
 * @param {Object} columns - The columns to be displayed in the table.
 * @param {ReactNode} children - The child components to be rendered inside the table.
 * @return {ReactNode} The rendered table component.
 */
function Table({ columns, children }) {
  return (
    <TableContext.Provider value={{ columns }}>
      <StyledTable role="table">{children}</StyledTable>
    </TableContext.Provider>
  );
}

/**
 * A description of the entire function.
 *
 * @param {Object} children - The child components to be rendered inside the header.
 * @return {ReactNode} The rendered header component.
 */
function Header({ children }) {
  const { columns } = useContext(TableContext);
  return (
    <StyledHeader role="row" columns={columns}>
      {children}
    </StyledHeader>
  );
}

/**
 * Renders a row component based on the provided color prop.
 *
 * @param {Object} children - The child components to be rendered inside the row.
 * @param {string} color - The color prop for conditional rendering.
 * @return {ReactNode} The rendered row component.
 */
function Row({ children, color = "" }) {
  const { columns } = useContext(TableContext);

  // Conditional rendering based on the provided color prop
  if (color === "green")
    return (
      <StyledRowGreen role="row" columns={columns}>
        {children}
      </StyledRowGreen>
    );
  if (color === "red")
    return (
      <StyledRowRed role="row" columns={columns}>
        {children}
      </StyledRowRed>
    );
  if (color === "grey")
    return (
      <StyledRowGrey role="row" columns={columns}>
        {children}
      </StyledRowGrey>
    );

  // Default row rendering
  return (
    <StyledRow role="row" columns={columns}>
      {children}
    </StyledRow>
  );
}

/**
 * Rendering the table body or an empty message if no data
 *
 * @param {Array} data - The data to render in the table body
 * @param {Function} render - The function to render each data item
 * @return {ReactNode} The rendered table body or an empty message
 */
function Body({ data, render }) {
  // Rendering the table body or an empty message if no data
  if (!data.length) return <Empty>No data to show at the moment</Empty>;
  return <StyledBody>{data.map(render)}</StyledBody>;
}

// Adding components to the Table object for easier access
Table.Header = Header;
Table.Body = Body;
Table.Row = Row;
Table.Footer = Footer;

export default Table; // Exporting the Table component as default
