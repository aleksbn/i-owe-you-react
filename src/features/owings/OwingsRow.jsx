/* eslint-disable react/prop-types */
import styled from "styled-components";
import Table from "../../ui/Table";
import { format } from "date-fns";
import { formatCurrency } from "../../utilities/helpers";

const StyledNickname = styled.div`
	font-family: "Sono";
	font-size: 2rem;
	font-weight: 500;
`;

const StyledAmount = styled.div`
	font-family: "Sono";
	font-weight: 500;
`;

const Img = styled.img`
	display: block;
	width: 6.4rem;
	aspect-ratio: 1 / 1;
	object-fit: fill;
	object-position: center;
	transform: scale(1.2);
`;

const StyledStatus = styled(StyledAmount)`
	font-weight: 700;
`;

const StyledDirection = styled(StyledAmount)``;

function OwingsRow({
	owing: {
		movementDate,
		amount,
		status,
		persons: { nickname, image },
		payments,
	},
}) {
	const statusToTagColor = {
		active: amount < 0 ? "green" : "red",
		repayed: "grey",
	};

	return (
		<Table.Row color={statusToTagColor[status]}>
			<div>{format(new Date(movementDate), "MMM dd yyyy")}</div>
			<StyledAmount>{formatCurrency(Math.abs(amount))}</StyledAmount>
			<StyledNickname>{nickname}</StyledNickname>
			<Img src={image ? image : "default-user.jpg"} />
			<StyledStatus type={statusToTagColor[status]}>
				{status === "repayed"
					? "Repayed"
					: `${formatCurrency(
							Math.abs(amount) -
								payments.reduce((acc, cur) => acc + cur.amount, 0)
							// eslint-disable-next-line no-mixed-spaces-and-tabs
					  )} to full repayment`}
			</StyledStatus>
			<StyledDirection>{amount > 0 ? "You" : nickname}</StyledDirection>
		</Table.Row>
	);
}

export default OwingsRow;
