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

function SearchPerson() {
	const [searchParams, setSearchParams] = useSearchParams();

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
