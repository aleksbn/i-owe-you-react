import { useSearchParams } from "react-router-dom";
import Spinner from "../../ui/Spinner";
import { useOwings } from "../owings/useOwings";
import { usePayments } from "../payments/usePayments";
import LoansLineChart from "./LoansLineChart";

function LoansToOthers() {
	const { owings, isLoading: isLoadingOwings } = useOwings("all");
	const { payments, isLoading: isLoadingPayments } = usePayments("all");
	const [searchParams] = useSearchParams();

	if (isLoadingOwings || isLoadingPayments) return <Spinner />;

	const owingsToSend = owings
		.filter((owing) => owing.amount < 0)
		.map((o) => {
			return { ...o, amount: -o.amount };
		});
	console.log(owingsToSend);
	const paymentsToSend = payments.filter((payment) =>
		owingsToSend.some((owing) => owing.id === payment.owingId)
	);
	const numDays = searchParams.get("last") ? +searchParams.get("last") : 7;

	return (
		<LoansLineChart
			owings={owingsToSend}
			payments={paymentsToSend}
			numDays={numDays}
			label1="I loaned out"
			label2="I received"
		/>
	);
}

export default LoansToOthers;
