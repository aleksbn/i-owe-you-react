/* eslint-disable no-mixed-spaces-and-tabs */
import { useForm } from "react-hook-form";
import { useCreateOwing } from "./useCreateOwing";
import Heading from "../../ui/style/Heading";
import Form from "../../ui/form/Form";
import FormRow from "../../ui/form/FormRow";
import Input from "../../ui/common/Input";
import { format } from "date-fns";
import Select from "../../ui/common/Select";
import { usePersons } from "../persons/usePersons";
import Button from "../../ui/common/Button";
import Spinner from "../../ui/style/Spinner";
import Checkbox from "../../ui/common/Checkbox";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUpdateOwing } from "./useUpdateOwing";
import { useUserData } from "../../context/UserDataProvider";

/**
 * Renders the details of an owing, allowing the user to view, create, or update owings.
 *
 * @param {object} onClose - Function to close the owing details view
 * @param {object} owingToUpdate - Object containing the details of the owing to update
 * @return {JSX.Element} The rendered JSX for the owing details view
 */
/* eslint-disable react/prop-types */
function OwingDetails({ onClose, owingToUpdate = {} }) {
  const { userData } = useUserData();
  const { id: owingId, ...owing } = owingToUpdate;
  const isEditSession = Boolean(owingId);
  const { register, handleSubmit, formState } = useForm({
    defaultValues: isEditSession ? owing : {},
  });
  const { errors } = formState;
  const { isCreating, createOwing } = useCreateOwing();
  const { isUpdating, updateOwing } = useUpdateOwing();
  const { isLoading, persons } = usePersons("all");
  const isWorking = isCreating || isLoading || isUpdating;
  const [owedByMe, setOwedByMe] = useState(owing.owedByMe || false);
  const navigate = useNavigate();
  const isRepayed = isEditSession
    ? Math.abs(owing.amount) ===
      owing[`payments_${userData}`].reduce((acc, cur) => acc + cur.amount, 0)
      ? true
      : false
    : false;

  const minValueForAmount = !isEditSession
    ? 1
    : owing[`payments_${userData}`].reduce((acc, cur) => acc + cur.amount, 0) +
      1;

  const payments = isEditSession ? [...owing[`payments_${userData}`]] : [];

  const minDate = !isEditSession
    ? new Date()
    : payments.length > 0
    ? payments.sort(
        (a, b) =>
          new Date(a.dateOfPayment).getTime() -
          new Date(b.dateOfPayment).getTime()
      )[0].dateOfPayment
    : new Date();

  /**
   * Submits the form data to either create or update an owing based on the current session.
   *
   * @param {Object} data - The form data containing the new owing information.
   * @return {void} This function does not return anything.
   */
  function onSubmit(data) {
    if (!isEditSession) {
      createOwing(
        { newOwing: { ...data, owedByMe }, userData },
        {
          /**
           * Navigates to the "/owings" route on success.
           *
           * @return {void}
           */
          onSuccess: () => {
            navigate("/owings");
          },
        }
      );
    } else {
      updateOwing(
        { newOwing: { ...data, id: owingId }, userData },
        {
          /**
           * Navigates to the "/owings" route on success.
           *
           * @return {void}
           */
          onSuccess: () => {
            navigate("/owings");
          },
        }
      );
    }
  }

  /**
   * Logs the provided errors to the console.
   *
   * @param {Array} errors - The errors to be logged.
   * @return {void} This function does not return anything.
   */
  function onError(errors) {
    console.log(errors);
  }

  if (isLoading) return <Spinner />;

  return (
    <>
      <Heading as="h1">
        {isEditSession
          ? `${owing[`persons_${userData}`].firstName} ${
              owing[`persons_${userData}`].lastName
            } ${isRepayed ? ` - already repayed` : ``}`
          : "Add a new owing"}
      </Heading>
      <Form
        onSubmit={handleSubmit(onSubmit, onError)}
        typeof={onClose ? "modal" : "regular"}
      >
        <FormRow label="Amount" error={errors?.amount?.message}>
          <Input
            type="number"
            min={0}
            disabled={isWorking || isRepayed}
            defaultValue={100}
            id="amount"
            {...register("amount", {
              required: "This field is required",
              min: {
                value: minValueForAmount,
                message: `Amount must be greater than ${(
                  minValueForAmount - 1
                ).toFixed(2)} $`,
              },
            })}
          />
        </FormRow>
        <FormRow label="Owed by me">
          <Checkbox
            id="owedByMe"
            checked={owedByMe}
            disabled={isEditSession}
            onChange={() => setOwedByMe((owedByMe) => !owedByMe)}
          />
        </FormRow>
        <FormRow label="Date" error={errors?.movementDate?.message}>
          <Input
            type="date"
            max={format(new Date(minDate), "yyyy-MM-dd")}
            defaultValue={format(new Date(), "yyyy-MM-dd")}
            disabled={isWorking || isRepayed}
            id="movementDate"
            {...register("movementDate", {
              required: "This field is required",
            })}
          />
        </FormRow>
        <FormRow label="Person" error={errors?.personId?.message}>
          <Select
            id="personId"
            type="form"
            disabled={isWorking || isEditSession}
            {...register("personId", {
              required: "This field is required",
            })}
          >
            {persons.map((person) => (
              <option key={person.id} value={person.id}>
                {isEditSession
                  ? person.nickname
                  : `${person.firstName} ${person.lastName} - ${person.nickname}`}
              </option>
            ))}
          </Select>
        </FormRow>
        <FormRow>
          <Button
            variation="secondary"
            disabled={isWorking}
            type="reset"
            onClick={() => onClose?.()}
          >
            Cancel
          </Button>
          <Button disabled={isCreating || isRepayed}>
            {isEditSession ? "Update owing" : "Add a new owing"}
          </Button>
        </FormRow>
      </Form>
    </>
  );
}

export default OwingDetails;
