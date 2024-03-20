import RegisterForm from "../features/authentication/RegisterForm";
import Heading from "../ui/Heading";
import { LoginRegisterLayout } from "../ui/LoginRegisterLayout";

function Register() {
	return (
		<LoginRegisterLayout>
			<Heading as="h4">Register a new account</Heading>
			<RegisterForm />
		</LoginRegisterLayout>
	);
}

export default Register;
