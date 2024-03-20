/* eslint-disable no-mixed-spaces-and-tabs */
import { useNavigate, useParams } from "react-router-dom";
import { useOwing } from "../features/owings/useOwing";
import Spinner from "../ui/Spinner";
import Empty from "../ui/Empty";
import OwingDetails from "../features/owings/OwingDetails";
import PaymentsTable from "../features/payments/PaymentsTable";
import Button from "../ui/Button";
import ConfirmRepayment from "../features/payments/ConfirmRepayment";
import Modal from "../ui/Modal";
import styled from "styled-components";

const StyledButtonRow = styled.div`
	padding: 0.6rem;
	display: block;
`;

const user_id_key = "f74fd96d64194db88394cabc984a4b14";

function Owing() {
	const { owingId } = useParams();
	const navigate = useNavigate();

	const { isLoading, owing, error } = useOwing(owingId !== "new" ? owingId : 0);

	const isRepayed =
		!isLoading && owing !== null
			? Math.abs(owing.amount) ===
			  owing[`payments_${user_id_key}`].reduce(
					(acc, cur) => acc + cur.amount,
					0
			  )
			: false;

	function handleClose() {
		navigate("/owings");
	}

	if (isLoading) return <Spinner />;

	if (!isLoading && owingId === "new")
		return <OwingDetails onClose={handleClose} />;

	if (!isLoading && owingId !== "new" && error)
		return <Empty resourceName="owing under that ID" />;

	const remainingAmount =
		Math.abs(owing.amount) -
		owing[`payments_${user_id_key}`].reduce((acc, cur) => acc + cur.amount, 0);

	return (
		<>
			<OwingDetails
				owingToUpdate={{
					...owing,
					owedByMe: owing.amount > 0,
					amount: Math.abs(owing.amount),
				}}
				onClose={handleClose}
			/>

			<PaymentsTable owingId={owingId} />
			<StyledButtonRow>
				<Modal>
					<Modal.Open opens="repay">
						<Button disabled={isRepayed}>Add a new payment</Button>
					</Modal.Open>
					<Modal.Window name="repay">
						<ConfirmRepayment
							maxAmount={remainingAmount}
							minDate={new Date(owing.movementDate)}
							owingId={owingId}
						/>
					</Modal.Window>
				</Modal>
			</StyledButtonRow>
		</>
	);
}

export default Owing;
