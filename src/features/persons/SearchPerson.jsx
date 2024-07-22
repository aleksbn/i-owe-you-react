import styled, { css } from "styled-components";
import Input from "../../ui/common/Input";
import { useSearchParams } from "react-router-dom";

const sizes = {
  max: css`
    width: 100%;
  `,
  normal: css`
    width: initial;
  `,
};

const SearchInput = styled(Input)`
  text-align: center;
  ${(props) => sizes[props.size]}
`;

SearchInput.defaultProps = {
  size: "normal",
};

/**
 * Renders a search input component that updates the search parameters based on the input value.
 *
 * @return {JSX.Element} The search input component.
 */
function SearchPerson() {
  const [searchParams, setSearchParams] = useSearchParams();

  /**
   * Updates the search parameters based on the input value.
   *
   * @param {Event} e - The input change event.
   * @return {void} This function does not return anything.
   */
  function handleTextChange(e) {
    if (e.target.value !== "") {
      searchParams.set("nickname", e.target.value);
      setSearchParams(searchParams);
    } else {
      searchParams.delete("nickname");
      setSearchParams(searchParams);
    }
  }

  return (
    <SearchInput
      onChange={handleTextChange}
      type="text"
      size="max"
      placeholder="Search by a nickname..."
    />
  );
}

export default SearchPerson;
