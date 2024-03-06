/* eslint-disable react/prop-types */
import styled from "styled-components";
import Heading from "./Heading";
import Button from "./Button";
import { useState } from "react";

const StyledConfirmRepay = styled.div`
	width: 40rem;
	display: flex;
	flex-direction: column;
	gap: 1.2rem;

	& p {
		color: var(--color-grey-500);
		margin-bottom: 1.2rem;
	}
`;

const StyledConfirmRepayRow = styled.div`
	display: flex;
	justify-content: flex-end;
	gap: 1.2rem;
	margin-top: 2.4rem;

	& input[type="text"] {
		border: none;
		width: 20%;
		text-align: right;
		margin-right: 0;
	}

	& input[type="range"] {
		width: 100%;
	}
`;

function ConfirmRepayment({ maxAmount, onConfirm, disabled, onClose }) {
	const [amount, setAmount] = useState(Math.round(maxAmount / 2));

	return (
		<StyledConfirmRepay>
			<Heading as="h3">Select the amount to repay</Heading>
			<StyledConfirmRepayRow>
				<input
					type="range"
					min="0"
					max={maxAmount}
					value={amount}
					onChange={(e) => setAmount(e.target.value)}
				/>
				<input type="text" value={amount} />
				<b>$</b>
			</StyledConfirmRepayRow>
			<StyledConfirmRepayRow>
				<Button variation="secondary" disabled={disabled} onClick={onClose}>
					Cancel
				</Button>
				<Button variation="danger" disabled={disabled} onClick={onConfirm}>
					Confirm
				</Button>
			</StyledConfirmRepayRow>
		</StyledConfirmRepay>
	);
}

export default ConfirmRepayment;
