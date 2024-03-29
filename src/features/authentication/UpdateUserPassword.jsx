import { useForm } from "react-hook-form";
import { useUpdateUser } from "./useUpdateUser";
import Form from "../../ui/form/Form";
import FormRow from "../../ui/form/FormRow";
import Input from "../../ui/common/Input";
import Button from "../../ui/common/Button";

function UpdateUserPassword() {
	const { register, handleSubmit, formState, getValues, reset } = useForm();
	const { errors } = formState;
	const { updateUser, isUpdating } = useUpdateUser();

	function onSubmit({ password }) {
		updateUser({ password }, { onSuccess: reset });
	}

	return (
		<Form onSubmit={handleSubmit(onSubmit)}>
			<FormRow
				label="New password (min 8 chars)"
				error={errors?.password?.message}
			>
				<Input
					type="password"
					id="password"
					autoComplete="current-password"
					disabled={isUpdating}
					{...register("password", {
						required: "This field is required",
						minLength: {
							value: 8,
							message: "Password needs a minimum of 8 characters",
						},
					})}
				/>
			</FormRow>
			<FormRow
				label="Password confirmation"
				error={errors?.passwordConfirm?.message}
			>
				<Input
					type="password"
					id="passwordConfirm"
					autoComplete="new-password"
					disabled={isUpdating}
					{...register("passwordConfirm", {
						required: "This field is required",
						validate: (value) => {
							getValues().password === value || "Passwords do not match";
						},
					})}
				/>
			</FormRow>
			<FormRow>
				<Button onClick={reset} type="reset" variation="secondary">
					Cancel
				</Button>
				<Button disabled={isUpdating}>Update password</Button>
			</FormRow>
		</Form>
	);
}

export default UpdateUserPassword;
