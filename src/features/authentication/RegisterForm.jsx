import { useNavigate } from "react-router-dom";
import Form from "../../ui/form/Form";
import FormRowVertical from "../../ui/form/FormRowVertical";
import Button from "../../ui/common/Button";
import { useRegister } from "./useRegister";
import SpinnerMini from "../../ui/style/SpinnerMini";
import Input from "../../ui/common/Input";
import { useForm } from "react-hook-form";
import { useUserData } from "../../context/UserDataProvider";

/**
 * RegisterForm component for user registration.
 *
 * @return {JSX.Element} The RegisterForm component.
 */
function RegisterForm() {
  const { setUserData } = useUserData();
  const { register: registerUser, isRegistering } = useRegister(setUserData);
  const { register, handleSubmit, formState, getValues } = useForm();
  const { errors } = formState;

  const navigate = useNavigate();

  /**
   * A function that handles the submission of user registration data.
   *
   * @param {Object} email - The email address of the user.
   * @param {Object} fullName - The full name of the user.
   * @param {Object} password - The password of the user.
   * @return {void} No return value.
   */
  function onSubmit({ email, fullName, password }) {
    registerUser(
      { email, fullName, password },
      {
        onSuccess: () => navigate("/welcome"),
      }
    );
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRowVertical label="Email address" error={errors?.email?.message}>
        <Input
          type="email"
          id="email"
          disabled={isRegistering}
          {...register("email", {
            required: "This field is required",
          })}
        />
      </FormRowVertical>
      <FormRowVertical label="Full name" error={errors?.fullName?.message}>
        <Input
          type="text"
          id="fullName"
          disabled={isRegistering}
          {...register("fullName", {
            required: "This field is required",
          })}
        />
      </FormRowVertical>
      <FormRowVertical label="Password" error={errors?.password?.message}>
        <Input
          type="password"
          id="password"
          autoComplete="current-password"
          disabled={isRegistering}
          {...register("password", {
            required: "This field is required",
            minLength: {
              value: 8,
              message: "Password needs a minimum of 8 characters",
            },
          })}
        />
      </FormRowVertical>
      <FormRowVertical
        label="Confirm password"
        error={errors?.confirmPassword?.message}
      >
        <Input
          type="password"
          id="passwordConfirm"
          autoComplete="new-password"
          disabled={isRegistering}
          {...register("passwordConfirm", {
            required: "This field is required",
            validate: (value) => {
              getValues().password === value || "Passwords do not match";
            },
          })}
        />
      </FormRowVertical>
      <FormRowVertical>
        <Button disabled={isRegistering} size="large">
          {!isRegistering ? "Register" : <SpinnerMini />}
        </Button>
      </FormRowVertical>
      <FormRowVertical>
        <Button
          type="button"
          disabled={isRegistering}
          onClick={() => navigate("/login")}
          size="large"
          variation="secondary"
        >
          Login instead
        </Button>
      </FormRowVertical>
    </Form>
  );
}

export default RegisterForm;
