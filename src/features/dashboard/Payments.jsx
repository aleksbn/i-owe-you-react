import { useSearchParams } from "react-router-dom";
import Spinner from "../../ui/style/Spinner";
import { useOwings } from "../owings/useOwings";
import { usePayments } from "../payments/usePayments";
import LineChart from "./LineChart";

function Payments() {
	const { owings, isLoading: isLoadingOwings } = useOwings("all");
	const { payments, isLoading: isLoadingPayments } = usePayments("all");
	const [searchParams] = useSearchParams();

	if (isLoadingOwings || isLoadingPayments) return <Spinner />;

	const owingsGiven = owings.filter((owing) => owing.amount < 0);
	const owingsReceived = owings.filter((owing) => owing.amount > 0);
	const paymentsGiven = payments.filter((payment) =>
		owingsGiven.some((owing) => owing.id === payment.owingId)
	);
	const paymentsReceived = payments.filter((payment) =>
		owingsReceived.some((owing) => owing.id === payment.owingId)
	);

	const numDays = searchParams.get("last") ? +searchParams.get("last") : 7;

	return (
		<LineChart
			mainLabel="Payments"
			dataSet1={{ set: paymentsReceived, dateForReducing: "dateOfPayment" }}
			dataSet2={{ set: paymentsGiven, dateForReducing: "dateOfPayment" }}
			numDays={numDays}
			label1="I repayed"
			label2="I got a payment"
		/>
	);
}

export default Payments;
