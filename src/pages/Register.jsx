import RegisterForm from "../features/authentication/RegisterForm";
import Heading from "../ui/style/Heading";
import { LoginRegisterLayout } from "../ui/component/LoginRegisterLayout";

/**
 * Renders a registration form for a new account.
 *
 * @return {JSX.Element} The registration form JSX element.
 */
function Register() {
  return (
    <LoginRegisterLayout>
      <Heading as="h4">Register a new account</Heading>
      <RegisterForm />
    </LoginRegisterLayout>
  );
}

export default Register;
