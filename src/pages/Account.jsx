import UpdateUserData from "../features/authentication/UpdateUserData";
import UpdateUserPassword from "../features/authentication/UpdateUserPassword";
import Heading from "../ui/style/Heading";
import Row from "../ui/layout/Row";

/**
 * Renders the Account component to update user data and password.
 *
 * @return {JSX.Element} The rendered Account component.
 */
function Account() {
  return (
    <>
      <Heading as="h1">Update your account</Heading>
      <Row type="vertical">
        <Heading as="h3">Update user data</Heading>
        <UpdateUserData />
      </Row>
      <Row type="vertical">
        <Heading as="h3">Update your password</Heading>
        <UpdateUserPassword />
      </Row>
    </>
  );
}

export default Account;
