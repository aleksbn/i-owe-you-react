import { useSearchParams } from "react-router-dom";
import { useDarkMode } from "../../context/DarkModeProvider";
import Spinner from "../../ui/style/Spinner";
import { useOwings } from "../owings/useOwings";
import { usePayments } from "../payments/usePayments";
import PieChartBox from "./PieChartBox";
import { fromToday } from "../../utilities/helpers";
import { compareAsc } from "date-fns";

const startDataLight = [
  {
    label: "Payments I received",
    value: 0,
    color: "#14b8a6",
  },
  {
    label: "Payments I gave",
    value: 0,
    color: "#ef4444",
  },
];

const startDataDark = [
  {
    label: "Payments I received",
    value: 0,
    color: "#16cc77",
  },
  {
    label: "Payments I gave",
    value: 0,
    color: "#b91c1c",
  },
];

/**
 * Renders a pie chart of payments in the dashboard.
 *
 * @return {JSX.Element} The pie chart component.
 */
function PaymentsPieChart() {
  const { owings, isLoading: isLoadingOwings } = useOwings("all");
  const { payments, isLoading: isLoadingPayments } = usePayments("all");
  const { isDarkMode } = useDarkMode();
  const [searchParams] = useSearchParams();

  const startData = isDarkMode ? startDataDark : startDataLight;

  if (isLoadingOwings || isLoadingPayments) return <Spinner />;

  const numDays = searchParams.get("last") ? +searchParams.get("last") : 7;
  const startDate = fromToday(-numDays);

  const myOwings = owings.filter((o) => o.amount < 0);
  const othersOwings = owings.filter((o) => o.amount > 0);
  startData[1].value = payments
    .filter((p) =>
      othersOwings.some(
        (o) =>
          o.id === p.owingId &&
          compareAsc(
            new Date(p.dateOfPayment),
            new Date(startDate.split("T")[0])
          ) >= 0
      )
    )
    .reduce((acc, cur) => acc + cur.amount, 0);
  startData[0].value = payments
    .filter(
      (p) =>
        myOwings.some((o) => o.id === p.owingId) &&
        compareAsc(
          new Date(p.dateOfPayment),
          new Date(startDate.split("T")[0])
        ) >= 0
    )
    .reduce((acc, cur) => acc + cur.amount, 0);

  return <PieChartBox data={[...startData]} heading="Payments in ($)" />;
}

export default PaymentsPieChart;
