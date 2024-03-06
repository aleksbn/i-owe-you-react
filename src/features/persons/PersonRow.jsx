/* eslint-disable react/prop-types */
import styled from "styled-components";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import { HiEye, HiTrash } from "react-icons/hi2";
import { useNavigate } from "react-router-dom";
import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";

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
	person: { id: personId, firstName, lastName, nickname, image, phoneNumber },
}) {
	const navigate = useNavigate();

	return (
		<Table.Row>
			<Img src={image ? image : "default-user.jpg"} />
			<FullName>
				{firstName} {lastName}
			</FullName>
			<Nickname>{nickname}</Nickname>
			<PhoneNumber>{phoneNumber}</PhoneNumber>
			<Modal>
				<Menus.Menu>
					<Menus.Toggle id={personId} />
					<Menus.List id={personId}>
						<Menus.Button
							icon={<HiEye />}
							onClick={() => navigate(`/people/${personId}`)}
						>
							See details
						</Menus.Button>
						<Modal.Open opens="delete">
							<Menus.Button icon={<HiTrash />}>Delete</Menus.Button>
						</Modal.Open>
					</Menus.List>
				</Menus.Menu>
				<Modal.Window name="delete">
					<ConfirmDelete
						resourceName="person"
						disabled={false}
						onConfirm={() => alert("You want to delete me?! Well, not yet!")}
						extraMessage="If you delete this person, you're also deleting all owings of that person."
					/>
				</Modal.Window>
			</Modal>
		</Table.Row>
	);
}

export default PersonRow;
