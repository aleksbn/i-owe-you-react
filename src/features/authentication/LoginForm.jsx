import { useState } from "react";
import { useLogin } from "./useLogin";
import Form from "../../ui/form/Form";
import FormRowVertical from "../../ui/form/FormRowVertical";
import Input from "../../ui/common/Input";
import Button from "../../ui/common/Button";
import SpinnerMini from "../../ui/style/SpinnerMini";
import { useNavigate } from "react-router-dom";
import { useUserData } from "../../context/UserDataProvider";

/**
 * Handles the form submission for the login form.
 *
 * @param {Event} e - The event object representing the form submission.
 * @return {void} This function does not return anything.
 */
function LoginForm() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { setUserData } = useUserData();
  const { login, isLoggingIn } = useLogin(setUserData);

  /**
   * Handles the form submission for the login form.
   *
   * @param {Event} e - The event object representing the form submission.
   * @return {void} This function does not return anything.
   */
  function handleSubmit(e) {
    e.preventDefault();
    if (!email || !password) return;
    login(
      { email, password, setUserData },
      {
        /**
         * A callback function that is called when the login operation is settled.
         * It clears the email and password fields.
         *
         * @return {void} This function does not return anything.
         */
        onSettled: () => {
          setEmail("");
          setPassword("");
        },
      }
    );
  }

  return (
    <Form onSubmit={handleSubmit}>
      <FormRowVertical label="Email address">
        <Input
          type="email"
          id="email"
          autoComplete="username"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={isLoggingIn}
        />
      </FormRowVertical>
      <FormRowVertical label="Password">
        <Input
          type="password"
          id="password"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={isLoggingIn}
        />
      </FormRowVertical>
      <FormRowVertical>
        <Button disabled={isLoggingIn} size="large">
          {!isLoggingIn ? "Login" : <SpinnerMini />}
        </Button>
      </FormRowVertical>
      <FormRowVertical>
        <Button
          disabled={isLoggingIn}
          onClick={() => navigate("/register")}
          size="large"
          variation="secondary"
        >
          Sign up instead
        </Button>
      </FormRowVertical>
    </Form>
  );
}

export default LoginForm;
