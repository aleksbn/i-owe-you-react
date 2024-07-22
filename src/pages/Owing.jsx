/* eslint-disable no-mixed-spaces-and-tabs */
import { useNavigate, useParams } from "react-router-dom";
import { useOwing } from "../features/owings/useOwing";
import Spinner from "../ui/style/Spinner";
import Empty from "../ui/content/Empty";
import OwingDetails from "../features/owings/OwingDetails";
import PaymentsTable from "../features/payments/PaymentsTable";
import Button from "../ui/common/Button";
import ConfirmRepayment from "../features/payments/ConfirmRepayment";
import Modal from "../ui/component/Modal";
import styled from "styled-components";
import { useUserData } from "../context/UserDataProvider";

const StyledButtonRow = styled.div`
  padding: 0.6rem;
  display: block;
`;

/**
 * Renders the Owing component which displays the details of an owing item and its payments.
 *
 * @return {JSX.Element} The rendered Owing component
 */
function Owing() {
  const { owingId } = useParams();
  const navigate = useNavigate();
  const { userData } = useUserData();

  const { isLoading, owing, error } = useOwing(
    owingId !== "new" ? owingId : 0,
    userData
  );

  const isRepayed =
    !isLoading && owing !== null
      ? Math.abs(owing.amount) ===
        owing[`payments_${userData}`].reduce((acc, cur) => acc + cur.amount, 0)
      : false;

  /**
   * Function to handle closing of the current owing view.
   *
   * @return {void} No return value
   */
  function handleClose() {
    navigate("/owings");
  }

  if (isLoading) return <Spinner />;

  if (!isLoading && owingId === "new")
    return <OwingDetails onClose={handleClose} userData={userData} />;

  if (!isLoading && owingId !== "new" && error)
    return <Empty resourceName="owing under that ID" />;

  const remainingAmount =
    Math.abs(owing.amount) -
    owing[`payments_${userData}`].reduce((acc, cur) => acc + cur.amount, 0);

  return (
    <>
      <OwingDetails
        owingToUpdate={{
          ...owing,
          owedByMe: owing.amount > 0,
          amount: Math.abs(owing.amount),
        }}
        onClose={handleClose}
        userData={userData}
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
