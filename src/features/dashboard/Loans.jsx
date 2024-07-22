import { useSearchParams } from "react-router-dom";
import Spinner from "../../ui/style/Spinner";
import { useOwings } from "../owings/useOwings";
import LineChart from "./LineChart";

/**
 * Function that renders the Loans component, fetching owings data and displaying it in a LineChart.
 *
 * @return {JSX.Element} The rendered LineChart component displaying owings data.
 */
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
