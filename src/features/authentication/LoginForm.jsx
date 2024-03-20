import { useState } from "react";
import { useLogin } from "./useLogin";
import Form from "../../ui/Form";
import FormRowVertical from "../../ui/FormRowVertical";
import Input from "../../ui/Input";
import Button from "../../ui/Button";
import SpinnerMini from "../../ui/SpinnerMini";
import { useNavigate } from "react-router-dom";

function LoginForm() {
	const navigate = useNavigate();
	const [email, setEmail] = useState("test@test.net");
	const [password, setPassword] = useState("Test1234");

	const { login, isLoggingIn } = useLogin();

	function handleSubmit(e) {
		e.preventDefault();
		if (!email || !password) return;
		login(
			{ email, password },
			{
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
