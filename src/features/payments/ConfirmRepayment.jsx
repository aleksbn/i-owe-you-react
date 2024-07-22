/* eslint-disable react/prop-types */
import styled from "styled-components";
import Heading from "../../ui/style/Heading";
import Button from "../../ui/common/Button";
import { useState } from "react";
import Form from "../../ui/form/Form";
import FormRow from "../../ui/form/FormRow";
import { useForm } from "react-hook-form";
import Input from "../../ui/common/Input";
import { format } from "date-fns";
import { useCreatePayment } from "./useCreatePayment";
import { useUserData } from "../../context/UserDataProvider";

const StyledConfirmRepay = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1.2rem;

  & p {
    color: var(--color-grey-500);
    margin-bottom: 1.2rem;
  }
`;

const StyledConfirmRepayRow = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 1.2rem;
  margin-top: 2.4rem;

  & span {
    width: 20%;
    display: inline-block;
  }

  & input[type="range"] {
    width: 100%;
  }
`;

/**
 * Submits the form data to create a new payment.
 *
 * @param {Object} data - The form data containing the payment details.
 * @return {void}
 */
function ConfirmRepayment({ maxAmount, minDate, disabled, onClose, owingId }) {
  const { userData } = useUserData();
  const [amount, setAmount] = useState(Math.round(maxAmount / 2));
  const { register, handleSubmit } = useForm();
  const { isCreating, createPayment } = useCreatePayment();

  /**
   * Submits the form data to create a new payment.
   *
   * @param {Object} data - The form data containing the payment details.
   * @return {void}
   */
  function onSubmit(data) {
    createPayment(
      { newPayment: { ...data, owingId }, userData },
      {
        /**
         * Executes the `onClose` function when the payment creation is successful.
         *
         * @return {void}
         */
        onSuccess: () => {
          onClose();
        },
      }
    );
  }

  return (
    <StyledConfirmRepay>
      <Heading as="h3">Select the amount to repay</Heading>
      <Form onSubmit={handleSubmit(onSubmit)} type="modal">
        <FormRow>
          <StyledConfirmRepayRow>
            <input
              type="range"
              min="1"
              max={maxAmount}
              defaultValue={Math.round(maxAmount / 2)}
              id="amount"
              {...register("amount", {})}
              onChange={(e) => setAmount(e.target.value)}
            />
            <span>{amount}</span>
            <b>$</b>
          </StyledConfirmRepayRow>
        </FormRow>
        <FormRow>
          <Input
            type="date"
            min={format(minDate, "yyyy-MM-dd")}
            defaultValue={format(new Date(), "yyyy-MM-dd")}
            id="dateOfPayment"
            {...register("dateOfPayment", {})}
          />
        </FormRow>
        <FormRow>
          <StyledConfirmRepayRow>
            <Button
              variation="secondary"
              disabled={isCreating}
              onClick={() => onClose?.()}
            >
              Cancel
            </Button>
            <Button disabled={isCreating || disabled}>Confirm</Button>
          </StyledConfirmRepayRow>
        </FormRow>
      </Form>
    </StyledConfirmRepay>
  );
}

export default ConfirmRepayment;
