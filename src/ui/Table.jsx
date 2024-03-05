/* eslint-disable react/prop-types */
import { createContext, useContext } from "react";
import styled from "styled-components";

const StyledTable = styled.div`
	border-radius: 7px;
	border: 1px solid var(--color-grey-200);
	font-size: 1.4rem;
	background-color: var() (--color-grey-0);
`;

const CommonRow = styled.div`
	display: grid;
	grid-template-columns: ${(props) => props.columns};
	column-gap: 2.4rem;
	align-items: center;
	transition: none;
`;

const StyledHeader = styled(CommonRow)`
	padding: 1.6rem 2.4rem;
	background-color: var(--color-grey-50);
	border-bottom: 1px solid var(--color-grey-100);
	text-transform: uppercase;
	letter-spacing: 0.4rem;
	font-weight: 600;
	color: var(--color-grey-600);
`;

const StyledRow = styled(CommonRow)`
	padding: 1.2rem 2.4rem;

	&:not(:last-child) {
		border-bottom: 1px solid var(--color-grey-100);
	}
`;

const StyledRowGreen = styled(StyledRow)`
	background-color: var(--color-green-300);
`;

const StyledRowRed = styled(StyledRow)`
	background-color: var(--color-red-300);
`;

const StyledBody = styled.section`
	margin: 0%.4rem 0;
`;

const Footer = styled.footer`
	background-color: var(--color-grey-50);
	display: flex;
	justify-content: center;
	padding: 1.2rem;

	&:not(:has(*)) {
		display: none;
	}
`;

const Empty = styled.p`
	font-size: 1.6rem;
	font-weight: 500;
	text-align: center;
	margin: 2.4rem;
`;

const TableContext = createContext();

function Table({ columns, children }) {
	return (
		<TableContext.Provider value={{ columns }}>
			<StyledTable role="table">{children}</StyledTable>
		</TableContext.Provider>
	);
}

function Header({ children }) {
	const { columns } = useContext(TableContext);
	return (
		<StyledHeader role="row" columns={columns}>
			{children}
		</StyledHeader>
	);
}

function Row({ children, color = "" }) {
	const { columns } = useContext(TableContext);

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

	return (
		<StyledRow role="row" columns={columns}>
			{children}
		</StyledRow>
	);
}

function Body({ data, render }) {
	if (!data.length) return <Empty>No data to show at the moment</Empty>;

	return <StyledBody>{data.map(render)}</StyledBody>;
}

Table.Header = Header;
Table.Body = Body;
Table.Row = Row;
Table.Footer = Footer;

export default Table;