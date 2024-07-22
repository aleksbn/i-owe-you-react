import { useForm } from "react-hook-form";
import Form from "../../ui/form/Form";
import Heading from "../../ui/style/Heading";
import { useCreatePerson } from "./useCreatePerson";
import FormRow from "../../ui/form/FormRow";
import Input from "../../ui/common/Input";
import FileInput from "../../ui/common/FileInput";
import Button from "../../ui/common/Button";
import { useUpdatePerson } from "./useUpdatePerson";
import { useUserData } from "../../context/UserDataProvider";

/**
 * Submits the form data and performs the appropriate action based on the edit session status.
 *
 * @param {Object} data - The form data to be submitted.
 * @return {void} This function does not return anything.
 */
/* eslint-disable react/prop-types */
function PersonDetails({ onClose, personToUpdate = {} }) {
  const { userData } = useUserData();
  const { id: personId, ...person } = personToUpdate;
  const isEditSession = Boolean(personId);
  const { register, handleSubmit, reset, formState } = useForm({
    defaultValues: isEditSession ? person : {},
  });
  const { errors } = formState;
  const { isCreating, createPerson } = useCreatePerson();
  const { isUpdating, updatePerson } = useUpdatePerson();
  const isWorking = isCreating || isUpdating;

  /**
   * Submits the form data and performs the appropriate action based on the edit session status.
   *
   * @param {Object} data - The form data to be submitted.
   * @return {void} This function does not return anything.
   */
  function onSubmit(data) {
    const image = typeof data.image === "string" ? data.image : data.image[0];
    if (!isEditSession) {
      createPerson(
        { newPerson: { ...data, image }, userData },
        {
          /**
           * Resets the form and calls the `onClose` function if it exists.
           *
           * @return {void} This function does not return anything.
           */
          onSuccess: () => {
            reset();
            onClose?.();
          },
        }
      );
    } else {
      updatePerson(
        { newPerson: { ...data, image, id: personId }, userData },
        {
          /**
           * Resets the form and calls the `onClose` function if it exists.
           *
           * @return {void} This function does not return anything.
           */
          onSuccess: () => {
            reset();
            onClose?.();
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

  return (
    <>
      <Heading as="h1">
        {isEditSession
          ? `${person.firstName} ${person.lastName}`
          : "Add a new person"}
      </Heading>

      <Form
        onSubmit={handleSubmit(onSubmit, onError)}
        typeof={onClose ? "modal" : "regular"}
      >
        <FormRow label="First name" error={errors?.firstName?.message}>
          <Input
            type="text"
            disabled={isWorking}
            id="firstName"
            {...register("firstName", {
              required: "This field is required",
            })}
          />
        </FormRow>
        <FormRow label="Last name" error={errors?.lastName?.message}>
          <Input
            type="text"
            disabled={isWorking}
            id="lastName"
            {...register("lastName", {
              required: "This field is required",
            })}
          />
        </FormRow>
        <FormRow label="Nickname" error={errors?.nickname?.message}>
          <Input
            type="text"
            disabled={isWorking}
            id="nickname"
            {...register("nickname", {
              required: "This field is required",
            })}
          />
        </FormRow>
        <FormRow label="Phone number" error={errors?.phoneNumber?.message}>
          <Input
            type="text"
            disabled={isWorking}
            id="phoneNumber"
            {...register("phoneNumber", {
              required: "This field is required",
            })}
          />
        </FormRow>
        <FormRow label="Photo" error={errors?.image?.message}>
          <FileInput
            id="image"
            type="file"
            disabled={isWorking}
            accept="image/*"
            {...register("image", {
              required: isEditSession ? false : "This field is required",
            })}
          />
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
          <Button disabled={isCreating}>
            {isEditSession ? "Update person" : "Add a new person"}
          </Button>
        </FormRow>
      </Form>
    </>
  );
}

export default PersonDetails;
