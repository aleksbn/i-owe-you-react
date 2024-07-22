import { useState } from "react";
import { useUpdateUser } from "./useUpdateUser";
import { useUser } from "./useUser";
import Form from "../../ui/form/Form";
import FormRow from "../../ui/form/FormRow";
import Input from "../../ui/common/Input";
import FileInput from "../../ui/common/FileInput";
import Button from "../../ui/common/Button";

/**
 * Renders a form for updating user data.
 *
 * @return {JSX.Element} The JSX element representing the form.
 */
function UpdateUserData() {
  const { user } = useUser().user;

  const {
    email,
    user_metadata: { fullName: currentFullName },
  } = user;

  const { updateUser, isUpdating } = useUpdateUser();
  const [fullName, setFullName] = useState(currentFullName);
  const [avatar, setAvatar] = useState(null);

  /**
   * Handles the form submission for updating the user's data.
   *
   * @param {Event} e - The form submission event.
   * @return {void} This function does not return anything.
   */
  function handleSubmit(e) {
    e.preventDefault();
    if (!fullName) return;
    updateUser(
      { fullName, avatar },
      {
        /**
         * Resets the avatar and clears the form.
         *
         * @return {void}
         */
        onSuccess: () => {
          setAvatar(null);
          e.target.reset();
        },
      }
    );
  }

  /**
   * Resets the full name and avatar to their initial values.
   *
   * @return {void} This function does not return anything.
   */
  function handleCancel() {
    setFullName(currentFullName);
    setAvatar(null);
  }

  return (
    <Form onSubmit={handleSubmit}>
      <FormRow label="Email address">
        <Input value={email} disabled />
      </FormRow>
      <FormRow label="Full name">
        <Input
          type="text"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          id="fullName"
          disabled={isUpdating}
        />
      </FormRow>
      <FormRow label="Avatar image">
        <FileInput
          id="avatar"
          accept="image/*"
          onChange={(e) => setAvatar(e.target.files[0])}
          disabled={isUpdating}
        />
      </FormRow>
      <FormRow>
        <Button
          type="reset"
          variation="secondary"
          disabled={isUpdating}
          onClick={handleCancel}
        >
          Cancel
        </Button>
        <Button disabled={isUpdating}>Update account</Button>
      </FormRow>
    </Form>
  );
}

export default UpdateUserData;
