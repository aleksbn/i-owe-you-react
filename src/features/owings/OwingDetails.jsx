/* eslint-disable no-mixed-spaces-and-tabs */
import { useForm } from "react-hook-form";
import { useCreateOwing } from "./useCreateOwing";
import Heading from "../../ui/Heading";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import { format } from "date-fns";
import Select from "../../ui/Select";
import { usePersons } from "../persons/usePersons";
import Button from "../../ui/Button";
import Spinner from "../../ui/Spinner";
import Checkbox from "../../ui/Checkbox";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUpdateOwing } from "./useUpdateOwing";

/* eslint-disable react/prop-types */
function OwingDetails({ onClose, owingToUpdate = {} }) {
	const { id: owingId, ...owing } = owingToUpdate;
	const isEditSession = Boolean(owingId);
	const { register, handleSubmit, formState } = useForm({
		defaultValues: isEditSession ? owing : {},
	});
	const { errors } = formState;
	const { isCreating, createOwing } = useCreateOwing();
	const { isUpdating, updateOwing } = useUpdateOwing();
	const { isLoading, persons } = usePersons();
	const isWorking = isCreating || isLoading || isUpdating;
	const [owedByMe, setOwedByMe] = useState(owing.owedByMe || false);
	const navigate = useNavigate();
	const isRepayed = isEditSession
		? owing.status === "active"
			? false
			: true
		: false;

	const minValueForAmount = !isEditSession
		? 1
		: owing.payments.reduce((acc, cur) => acc + cur.amount, 0) + 1;

	function onSubmit(data) {
		if (!isEditSession) {
			createOwing(
				{ ...data, owedByMe },
				{
					onSuccess: () => {
						navigate("/owings");
					},
				}
			);
		} else {
			updateOwing(
				{ ...data, id: owingId },
				{
					onSuccess: () => {
						navigate("/owings");
					},
				}
			);
		}
	}

	function onError(errors) {
		console.log(errors);
	}

	function toggleOwer() {
		setOwedByMe(!owedByMe);
	}

	if (isLoading) return <Spinner />;

	return (
		<>
			<Heading as="h1">
				{isEditSession
					? `${owing.persons.firstName} ${owing.persons.lastName}`
					: "Add a new owing"}
			</Heading>
			<Form
				onSubmit={handleSubmit(onSubmit, onError)}
				typeof={onClose ? "modal" : "regular"}
			>
				<FormRow label="Amount" error={errors?.amount?.message}>
					<Input
						type="number"
						min={0}
						disabled={isWorking || isRepayed}
						defaultValue={100}
						id="amount"
						{...register("amount", {
							required: "This field is required",
							min: {
								value: minValueForAmount,
								message: `Amount must be greater than ${(
									minValueForAmount - 1
								).toFixed(2)} $`,
							},
						})}
					/>
				</FormRow>
				<FormRow label="Owed by me">
					<Checkbox
						disabled={isEditSession}
						id="owedByMe"
						checked={owing.owedByMe}
						onChange={toggleOwer}
						{...register("owedByMe", {})}
					/>
				</FormRow>
				<FormRow label="Date" error={errors?.movementDate?.message}>
					<Input
						type="date"
						max={format(new Date(), "yyyy-MM-dd")}
						defaultValue={format(new Date(), "yyyy-MM-dd")}
						disabled={isWorking || isRepayed}
						id="movementDate"
						{...register("movementDate", {
							required: "This field is required",
						})}
					/>
				</FormRow>
				<FormRow label="Person owing" error={errors?.personId?.message}>
					<Select
						id="personId"
						disabled={isWorking || isEditSession}
						{...register("personId", {
							required: "This field is required",
						})}
					>
						{persons.map((person) => (
							<option key={person.id} value={person.id}>
								{person.nickname}
							</option>
						))}
					</Select>
				</FormRow>
				<FormRow>
					<Button
						variation="secondary"
						disabled={isWorking}
						type="reset"
						onClick={() => onClose?.()}
					>
						Cancel
					</Button>
					<Button disabled={isCreating || isRepayed}>
						{isEditSession ? "Update owing" : "Add a new owing"}
					</Button>
				</FormRow>
			</Form>
		</>
	);
}

export default OwingDetails;
