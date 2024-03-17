import UpdateUserData from "../features/authentication/UpdateUserData";
import UpdateUserPassword from "../features/authentication/UpdateUserPassword";
import Heading from "../ui/Heading";
import Row from "../ui/Row";

function Account() {
	return (
		<>
			<Heading as="h1">Update your account</Heading>
			<Row>
				<Heading as="h3">Update user data</Heading>
				<UpdateUserData />
			</Row>
			<Row>
				<Heading as="h3">Update your password</Heading>
				<UpdateUserPassword />
			</Row>
		</>
	);
}

export default Account;
