import { useSearchParams } from "react-router-dom";
import Spinner from "../../ui/Spinner";
import { useOwings } from "../owings/useOwings";
import LineChart from "./LineChart";

function Loans() {
	const { owings, isLoading: isLoadingOwings } = useOwings("all");
	const [searchParams] = useSearchParams();

	if (isLoadingOwings) return <Spinner />;

	const owingsGiven = owings
		.filter((owing) => owing.amount < 0)
		.map((o) => {
			return { ...o, amount: -o.amount };
		});
	const owingsReceived = owings.filter((owing) => owing.amount > 0);

	const numDays = searchParams.get("last") ? +searchParams.get("last") : 7;

	return (
		<LineChart
			mainLabel="Loans"
			dataSet1={{ set: owingsReceived, dateForReducing: "movementDate" }}
			dataSet2={{ set: owingsGiven, dateForReducing: "movementDate" }}
			numDays={numDays}
			label1="I took a loan"
			label2="I loaned to others"
		/>
	);
}

export default Loans;
