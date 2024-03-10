/* eslint-disable react/prop-types */
import styled from "styled-components";
import Table from "../../ui/Table";
import { format } from "date-fns";
import { formatCurrency } from "../../utilities/helpers";
import Modal from "../../ui/Modal";
import Menus from "../../ui/Menus";
import { HiEye, HiMiniBanknotes, HiTrash } from "react-icons/hi2";
import ConfirmDelete from "../../ui/ConfirmDelete";
import { useNavigate } from "react-router-dom";
import ConfirmRepayment from "../../ui/ConfirmRepayment";
import { useDeleteOwing } from "./useDeleteOwing";

const StyledNickname = styled.div`
	font-family: "Sono";
	font-size: 2rem;
	font-weight: 500;
`;

const StyledDate = styled.div`
	font-family: "Sono";
	font-weight: 500;
`;

const StyledAmount = styled.div`
	font-family: "Sono";
	font-weight: 500;
`;

const Img = styled.img`
	display: block;
	width: 6.4rem;
	aspect-ratio: 1 / 1;
	object-fit: fill;
	object-position: center;
	transform: scale(1.2);
`;

const StyledStatus = styled(StyledAmount)`
	font-weight: 700;
	text-decoration: underline;
`;

const StyledDirection = styled(StyledAmount)``;

// details
// repay
// delete

function OwingsRow({
	owing: {
		id: owingId,
		movementDate,
		amount,
		status,
		persons: { nickname, image },
		payments,
	},
}) {
	const navigate = useNavigate();
	const { isDeleting, deleteOwing } = useDeleteOwing();
	const remainingAmount =
		Math.abs(amount) - payments.reduce((acc, cur) => acc + cur.amount, 0);
	const statusToTagColor = {
		active: amount < 0 ? "green" : "red",
		repayed: "grey",
	};

	return (
		<Table.Row color={statusToTagColor[status]}>
			<StyledDate>{format(new Date(movementDate), "MMM dd yyyy")}</StyledDate>
			<StyledAmount>{formatCurrency(Math.abs(amount))}</StyledAmount>
			<StyledNickname>{nickname}</StyledNickname>
			<Img src={image ? image : "default-user.jpg"} />
			<StyledStatus type={statusToTagColor[status]}>
				{status === "repayed"
					? "Repayed"
					: `${formatCurrency(remainingAmount)} to full repayment`}
			</StyledStatus>
			<StyledDirection>{amount > 0 ? "You" : nickname}</StyledDirection>
			<Modal>
				<Menus.Menu>
					<Menus.Toggle id={owingId} />
					<Menus.List id={owingId}>
						<Menus.Button
							icon={<HiEye />}
							onClick={() => navigate(`/owings/${owingId}`)}
						>
							See details
						</Menus.Button>
						{remainingAmount > 0 && (
							<Modal.Open opens="repay">
								<Menus.Button icon={<HiMiniBanknotes />}>Repay</Menus.Button>
							</Modal.Open>
						)}
						<Modal.Open opens="delete">
							<Menus.Button icon={<HiTrash />}>Delete</Menus.Button>
						</Modal.Open>
					</Menus.List>
				</Menus.Menu>
				<Modal.Window name="delete">
					<ConfirmDelete
						resourceName="owing"
						disabled={isDeleting}
						onConfirm={() => deleteOwing(owingId)}
						extraMessage="If you delete this owing, you'll also delete all payments connected to it."
					/>
				</Modal.Window>
				<Modal.Window name="repay">
					<ConfirmRepayment
						maxAmount={remainingAmount}
						onConfirm={() => alert("You'll pay eventually, don't worry")}
						disabled={isDeleting}
					/>
				</Modal.Window>
			</Modal>
		</Table.Row>
	);
}

export default OwingsRow;
