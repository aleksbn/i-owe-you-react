/* eslint-disable react/prop-types */
import { HiCurrencyDollar, HiOutlineCurrencyDollar } from "react-icons/hi2";
import { FaPeopleCarry } from "react-icons/fa";
import { FaPeopleArrows } from "react-icons/fa6";
import Stat from "./Stat";
import { useUserData } from "../../context/UserDataProvider";
import { formatCurrency } from "../../utilities/helpers";

function Stats({ owings }) {
	const { userData } = useUserData();
	const activeOwings = owings.filter((owing) => {
		const totalPayments = owing[`payments_${userData}`].reduce(
			(acc, cur) => acc + cur.amount,
			0
		);
		return Math.abs(owing.amount) !== totalPayments;
	});

	const moneyThatIOwe = activeOwings.reduce((acc, cur) => {
		const paymentsForOwing = cur[`payments_${userData}`].reduce(
			(acc2, cur2) => acc2 + cur2.amount,
			0
		);
		if (cur.amount > 0) return acc + paymentsForOwing;
		else return acc;
	}, 0);
	const moneyOwedToMe = activeOwings.reduce((acc, cur) => {
		const paymentsForOwing = cur[`payments_${userData}`].reduce(
			(acc2, cur2) => acc2 + cur2.amount,
			0
		);
		if (cur.amount < 0) return acc + paymentsForOwing;
		else return acc;
	}, 0);
	const peopleThatIOwe = activeOwings.filter(
		(owing) => owing.amount > 0
	).length;
	const peopleThatOweToMe = activeOwings.filter(
		(owing) => owing.amount < 0
	).length;

	return (
		<>
			<Stat
				icon={<HiCurrencyDollar />}
				title="Money that I owe"
				color="red"
				value={formatCurrency(moneyThatIOwe)}
			/>
			<Stat
				icon={<HiOutlineCurrencyDollar />}
				title="Money owed to me"
				color="green"
				value={formatCurrency(moneyOwedToMe)}
			/>
			<Stat
				icon={<FaPeopleCarry />}
				title="People that I owe to"
				color="red"
				value={peopleThatIOwe}
			/>
			<Stat
				icon={<FaPeopleArrows />}
				title="People that owe to me"
				color="green"
				value={peopleThatOweToMe}
			/>
		</>
	);
}

export default Stats;
