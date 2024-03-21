/* eslint-disable react/prop-types */
import styled from "styled-components";
import Empty from "../../ui/Empty";
import Menus from "../../ui/Menus";
import Spinner from "../../ui/Spinner";
import Table from "../../ui/Table";
import { usePayments } from "./usePayments";
import PaymentRow from "./PaymentRow";
import { useUserData } from "../../context/UserDataProvider";

const StyledPaymentsTable = styled.div`
	width: 50%;
`;

function PaymentsTable({ owingId }) {
	const { userData } = useUserData();
	const { isLoading, payments, count } = usePayments({ userData, owingId });

	if (isLoading) return <Spinner />;

	if (!count) return <Empty resourceName="payments" />;

	return (
		<StyledPaymentsTable>
			<Menus>
				<Table columns="1fr 1fr 3.2rem">
					<Table.Header>
						<div>Date</div>
						<div>Amount</div>
						<div></div>
					</Table.Header>
					<Table.Body
						data={payments}
						render={(payment, id) => (
							<PaymentRow key={payment.id} payment={payment} row={id + 1} />
						)}
					></Table.Body>
				</Table>
			</Menus>
		</StyledPaymentsTable>
	);
}

export default PaymentsTable;
