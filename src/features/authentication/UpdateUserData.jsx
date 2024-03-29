import { useState } from "react";
import { useUpdateUser } from "./useUpdateUser";
import { useUser } from "./useUser";
import Form from "../../ui/form/Form";
import FormRow from "../../ui/form/FormRow";
import Input from "../../ui/common/Input";
import FileInput from "../../ui/common/FileInput";
import Button from "../../ui/common/Button";

function UpdateUserData() {
	const { user } = useUser().user;

	const {
		email,
		user_metadata: { fullName: currentFullName },
	} = user;

	const { updateUser, isUpdating } = useUpdateUser();
	const [fullName, setFullName] = useState(currentFullName);
	const [avatar, setAvatar] = useState(null);

	function handleSubmit(e) {
		e.preventDefault();
		if (!fullName) return;
		updateUser(
			{ fullName, avatar },
			{
				onSuccess: () => {
					setAvatar(null);
					e.target.reset();
				},
			}
		);
	}

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
