import LoginForm from "../features/authentication/LoginForm";
import Heading from "../ui/style/Heading";
import { LoginRegisterLayout } from "../ui/component/LoginRegisterLayout";
import { useUser } from "../features/authentication/useUser";
import Spinner from "../ui/style/Spinner";
import { useNavigate } from "react-router-dom";

function Login() {
	const { isLoading, isAuthenticated } = useUser();
	const navigate = useNavigate();

	function isLoggedIn() {
		navigate("/welcome");
	}

	if (isLoading) return <Spinner />;

	if (isAuthenticated) isLoggedIn();

	return (
		<LoginRegisterLayout>
			<Heading as="h4">Log in into your account</Heading>
			<LoginForm />
		</LoginRegisterLayout>
	);
}

export default Login;
