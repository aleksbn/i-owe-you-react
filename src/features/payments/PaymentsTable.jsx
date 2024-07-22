/* eslint-disable react/prop-types */
import styled from "styled-components";
import Empty from "../../ui/content/Empty";
import Menus from "../../ui/component/Menus";
import Spinner from "../../ui/style/Spinner";
import Table from "../../ui/common/Table";
import { usePayments } from "./usePayments";
import PaymentRow from "./PaymentRow";

const StyledPaymentsTable = styled.div`
  width: 50%;
`;

/**
 * Renders the PaymentsTable component based on the owingId.
 *
 * @param {Object} owingId - The ID of the owing entity.
 * @return {JSX.Element} The rendered PaymentsTable component.
 */
function PaymentsTable({ owingId }) {
  const { isLoading, payments, count } = usePayments(owingId);

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
