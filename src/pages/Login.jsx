import LoginForm from "../features/authentication/LoginForm";
import Heading from "../ui/Heading";
import { LoginRegisterLayout } from "../ui/LoginRegisterLayout";

function Login() {
	return (
		<LoginRegisterLayout>
			<Heading as="h4">Log in into your account</Heading>
			<LoginForm />
		</LoginRegisterLayout>
	);
}

export default Login;
