import styled, { css } from "styled-components";

// Styled component for form elements
const Form = styled.form`
  /* Conditional styling based on props.type */
  ${(props) =>
    props.type === "regular" &&
    css`
      padding: 2.4rem 4rem;
      background-color: var(--color-grey-0);
      border: 1px solid var(--color-grey-100);
      border-radius: var(--border-radius-md);
    `}

  /* Conditional styling for modal type */
	${(props) => {
    props.type === "modal" &&
      css`
        width: 80rem;
      `;
  }}

  /* Common styling for both regular and modal forms */
  overflow: hidden;
  font-size: 1.4rem;
`;

// Default props for the Form component
Form.defaultProps = {
  type: "regular",
};

export default Form;
