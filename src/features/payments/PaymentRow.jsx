/* eslint-disable react/prop-types */
import styled from "styled-components";
import Table from "../../ui/Table";
import { format } from "date-fns";
import { formatCurrency } from "../../utilities/helpers";
import SpinnerMini from "../../ui/SpinnerMini";
import Modal from "../../ui/Modal";
import Menus from "../../ui/Menus";
import { HiTrash } from "react-icons/hi2";
import ConfirmDelete from "../../ui/ConfirmDelete";
import { useDeletePayment } from "./useDeletePayment";
import { useUserData } from "../../context/UserDataProvider";

const StyledDate = styled.div`
	font-family: "Sono";
	font-weight: 500;
`;

const StyledAmount = styled.div`
	font-family: "Sono";
	font-weight: 500;
`;

function PaymentRow({
	payment: { id: paymentId, amount, dateOfPayment },
	row,
}) {
	const { userData } = useUserData();
	const { isDeleting, deletePayment } = useDeletePayment();
	const color = row % 2 !== 0 ? "grey" : "";

	if (!paymentId) return <SpinnerMini />;

	return (
		<Table.Row color={color}>
			<StyledDate>{format(dateOfPayment, "MMM dd yyyy")}</StyledDate>
			<StyledAmount>{formatCurrency(Math.abs(amount))}</StyledAmount>
			<Modal>
				<Menus.Menu>
					<Menus.Toggle id={paymentId} />
					<Menus.List id={paymentId}>
						<Modal.Open opens="delete">
							<Menus.Button icon={<HiTrash />}>Delete</Menus.Button>
						</Modal.Open>
					</Menus.List>
				</Menus.Menu>
				<Modal.Window name="delete">
					<ConfirmDelete
						disabled={isDeleting}
						resourceName="payment"
						onConfirm={() => deletePayment({ id: paymentId, userData })}
					/>
				</Modal.Window>
			</Modal>
		</Table.Row>
	);
}

export default PaymentRow;
