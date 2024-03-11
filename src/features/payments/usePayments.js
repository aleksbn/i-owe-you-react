import { useQuery } from "@tanstack/react-query";
import { getPayments } from "../../services/apiPayments";

export function usePayments(owingId) {
	const {
		isLoading,
		data: { data: payments, count } = {},
		error,
	} = useQuery({
		queryKey: ["payments"],
		queryFn: () => getPayments(owingId),
	});

	return { isLoading, payments, count, error };
}
