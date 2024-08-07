/* eslint-disable react/prop-types */
import styled from "styled-components";
import Table from "../../ui/common/Table";
import Menus from "../../ui/component/Menus";
import { HiPencil, HiTrash } from "react-icons/hi2";
import { useNavigate } from "react-router-dom";
import Modal from "../../ui/component/Modal";
import ConfirmDelete from "../../ui/component/ConfirmDelete";
import { useDeletePerson } from "./useDeletePerson";
import { useUserData } from "../../context/UserDataProvider";

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
  border-radius: 20%;
  padding: 0.3rem;
`;

/**
 * Renders a row in a table displaying information about a person.
 *
 * @param {Object} props - The properties passed to the component.
 * @param {Object} props.person - The person object containing the person's information.
 * @param {string} props.person.id - The ID of the person.
 * @param {string} props.person.firstName - The first name of the person.
 * @param {string} props.person.lastName - The last name of the person.
 * @param {string} props.person.nickname - The nickname of the person.
 * @param {string} props.person.image - The image URL of the person.
 * @param {string} props.person.phoneNumber - The phone number of the person.
 * @return {JSX.Element} The rendered row in the table.
 */
function PersonRow({
  person: { id: personId, firstName, lastName, nickname, image, phoneNumber },
}) {
  const { userData } = useUserData();
  const navigate = useNavigate();
  const { isDeleting, deletePerson } = useDeletePerson();

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
              icon={<HiPencil />}
              onClick={() => navigate(`/people/${personId}`)}
            >
              Update details
            </Menus.Button>
            <Modal.Open opens="delete">
              <Menus.Button icon={<HiTrash />}>Delete</Menus.Button>
            </Modal.Open>
          </Menus.List>
        </Menus.Menu>
        <Modal.Window name="delete">
          <ConfirmDelete
            resourceName="person"
            disabled={isDeleting}
            onConfirm={() => deletePerson({ id: personId, userData })}
            extraMessage="If you delete this person, you're also deleting all owings connected to this person."
          />
        </Modal.Window>
      </Modal>
    </Table.Row>
  );
}

export default PersonRow;
