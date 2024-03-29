// Importing necessary modules from styled-components.
import styled, { css } from "styled-components";

// Object defining different sizes of the button with corresponding CSS styles.
const sizes = {
	small: css`
		font-size: 1.2rem;
		padding: 0.4rem 0.8rem;
		text-transform: uppercase;
		font-weight: 600;
		text-align: center;
	`,
	medium: css`
		font-size: 1.4rem;
		padding: 1.2rem 1.6rem;
		font-weight: 500;
	`,
	large: css`
		font-size: 1.6rem;
		padding: 1.2rem 2.4rem;
		font-weight: 500;
	`,
};

// Object defining different variations (styles) of the button.
const variations = {
	primary: css`
		color: var(--color-brand-50);
		background-color: var(--color-brand-600);

		&:hover {
			background-color: var(--color-brand-700);
		}
	`,
	secondary: css`
		color: var(--color-grey-600);
		background: var(--color-grey-0);
		border: 1px solid var(--color-grey-200);

		&:hover {
			background-color: var(--color-grey-50);
		}
	`,
	danger: css`
		color: var(--color-red-100);
		background-color: var(--color-red-700);

		&:hover {
			background-color: var(--color-red-800);
		}
	`,
};

// Styled component for the Button with dynamic CSS based on props.
const Button = styled.button`
	border: none;
	border-radius: var(--border-radius-sm);
	box-shadow: var(--shadow-sm);

	${(props) => sizes[props.size]} /* Applying size styles based on props */
	${(props) =>
		variations[props.variation]} /* Applying variation styles based on props */

	&:disabled {
		background-color: var(--color-grey-400);
	}
`;

// Setting default props for the Button component.
Button.defaultProps = {
	variation: "primary", // Default variation is primary.
	size: "medium", // Default size is medium.
};

export default Button; // Exporting the Button component as default.
