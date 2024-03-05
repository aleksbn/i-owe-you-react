/* eslint-disable react/prop-types */
import styled from "styled-components";
import Table from "../../ui/Table";

const FullName = styled.div`
	font-size: 2.4rem;
	font-weight: 600;
	color: var(--color-grey-600);
	font-family: "Sono";
`;

const Nickname = styled.div`
	font-family: "Sono";
	font-size: 2rem;
	font-weight: 500;
`;

const PhoneNumber = styled.div`
	font-family: "Sono";
	font-size: 2rem;
	font-weight: 600;
	font-style: italic;
`;

const Img = styled.img`
	display: block;
	width: 6.4rem;
	aspect-ratio: 1 / 1;
	object-fit: cover;
	object-position: center;
	transform: scale(1.35) translateX(-7px);
`;

function PersonRow({
	person: { firstName, lastName, nickname, image, phoneNumber },
}) {
	return (
		<Table.Row>
			<Img src={image ? image : "default-user.jpg"} />
			<FullName>
				{firstName} {lastName}
			</FullName>
			<Nickname>{nickname}</Nickname>
			<PhoneNumber>{phoneNumber}</PhoneNumber>
		</Table.Row>
	);
}

export default PersonRow;
