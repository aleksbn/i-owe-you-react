import { useNavigate, useParams } from "react-router-dom";
import { useOwing } from "../features/owings/useOwing";
import Spinner from "../ui/Spinner";
import Empty from "../ui/Empty";
import OwingDetails from "../features/owings/OwingDetails";

function Owing() {
	const { owingId } = useParams();
	const navigate = useNavigate();

	const { isLoading, owing, error } = useOwing(owingId !== "new" ? owingId : 0);

	function handleClose() {
		navigate("/owings");
	}

	if (isLoading) return <Spinner />;

	if (!isLoading && owingId === "new")
		return <OwingDetails onClose={handleClose} />;

	if (!isLoading && owingId !== "new" && error)
		return <Empty resourceName="owing under that ID" />;

	return (
		<>
			<OwingDetails
				owingToUpdate={{
					...owing,
					owedByMe: owing.amount > 0,
					amount: Math.abs(owing.amount),
				}}
				onClose={handleClose}
			/>
			{/* Repayments rows go here */}
		</>
	);
}

export default Owing;
