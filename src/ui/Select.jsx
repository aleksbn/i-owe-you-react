import styled, { css } from "styled-components";

const types = {
	form: css`
		border-width: 1px;
		border-color: var(--color-grey-800);
		border-style: solid;
	`,
	details: css`
		border: none;
	`,
};

const Select = styled.select`
	width: 100%;
	font-size: 1.6rem;
	border-radius: var(--border-radius-sm);
	text-align: center;

	${(props) => types[props.type]}
`;

export default Select;
