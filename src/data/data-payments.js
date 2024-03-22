import { fromToday, subtractDates } from "../utilities/helpers";

const generateRandomPayments = (owings) => {
	const payments = [];
	owings.forEach((o) => {
		const numberOfPayments = Math.floor(Math.random() * 4);
		let totalRepayed = 0;
		const originalAmount = Math.abs(o.amount);
		for (let i = 1; i <= numberOfPayments; i++) {
			if (totalRepayed < originalAmount) {
				let amountPayed = Math.floor(
					Math.random() * (originalAmount / numberOfPayments) * 2
				);
				if (amountPayed === 0) amountPayed = 1;
				if (amountPayed > originalAmount - totalRepayed)
					amountPayed = originalAmount - totalRepayed;
				const dateDiference = subtractDates(
					new Date().toISOString(),
					new Date(o.movementDate).toISOString()
				);
				const dateSubstraction = Math.floor(Math.random() * dateDiference + 1);
				const newPayment = {
					owingId: o.id,
					amount: amountPayed,
					dateOfPayment: fromToday(-dateSubstraction),
				};
				totalRepayed += amountPayed;
				payments.push(newPayment);
			}
		}
	});
	return payments;
};

export default generateRandomPayments;
